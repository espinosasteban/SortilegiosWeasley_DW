import { createContext, useState, useEffect } from "react";
import { ArticuloCarrito, Carrito } from "../tipos";
import { jwtDecode } from "jwt-decode";

export const CartContext = createContext<{
  cartItems: ArticuloCarrito[];
  addToCart: (item: ArticuloCarrito) => void;
  removeFromCart: (item: ArticuloCarrito) => void;
  getCartTotal: () => number;
  toggleCart: () => void;
  getTotalCartItems: () => number;
  deleteItem: (item: ArticuloCarrito) => void;
  migrateCart: (items: ArticuloCarrito[]) => Promise<void>;
}>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  getCartTotal: () => 0,
  toggleCart: () => {},
  getTotalCartItems: () => 0,
  deleteItem: () => {},
  migrateCart: async () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<ArticuloCarrito[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [carrito, setCarrito] = useState<Carrito>({} as Carrito);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setCartItems([]);
      return;
    }

    let decoded;
    try {
      decoded = jwtDecode<{ id: string }>(storedToken);
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      setCartItems([]);
      return;
    }

    const fetchCart = async () => {
      try {
        const response = await fetch(`http://localhost:5000/carrito/${decoded.id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${storedToken}` },
        });

        if (response.ok) {
          const data = await response.json();
          setCarrito(data);
          setCartItems(data.items || []);
        }  else if (response.status === 404) {
          console.warn("Carrito no encontrado para este usuario.");
        } else {
          console.error("Error al obtener el carrito:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error en la petición del carrito:", error);
      }
    };
    fetchCart();
  }, [token]);

  

const addToCart = async (item: ArticuloCarrito, cantidad: number = 1 ) => {
  const token = localStorage.getItem("token");
  if (!token) return; // Si no hay token, no hacemos nada

  const decoded = jwtDecode(token) ?? {};
  const userId = decoded.id;

  if (!userId) {
    console.error("Error: No se encontró el ID del usuario en el token.");
    return;
  }
  
  try {
      const response = await fetch(`http://localhost:5000/carrito/addCart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: userId,
          productoId: item._id,
          total_items: cantidad,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCartItems(prevCartItems => {
          const isItemInCart = prevCartItems.find(cartItem => cartItem._id === item._id);
          if (isItemInCart) {
            return prevCartItems.map(cartItem =>
              cartItem._id === item._id
                ? { ...cartItem, total_items: (cartItem.total_items || 0) + cantidad }
                : cartItem
            )} else { return [...prevCartItems, { ...item, total_items: cantidad }]};
        });
    } else{
    console.error("Error agregando producto al carrito:", data);
  }
  } catch (error) {console.error("Error al manejar el carrito:", error);}} ;


  // Remover un producto del carrito
  const removeFromCart = async (item: ArticuloCarrito) => {
    const token = localStorage.getItem("token");
    if (!token) return; // Si no hay token, no hacemos nada
  
    const decoded = jwtDecode(token) ?? {};
    const userId = decoded.id;

    const isItemInCart = cartItems.find((cartItem) => cartItem._id === item._id);

    if (isItemInCart?.total_items === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem._id !== item._id));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, total_items: cartItem.total_items - 1 }
            : cartItem
        )
      );
    }

    if (token) {
      try {
        await fetch(`http://localhost:5000/carrito/decreaseItemQty/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productoId: item._id,}),
        });
      } catch (error) {
        console.error("Error al remover producto del carrito en el backend:", error);
      }
    }
  };

  // Eliminar producto del carrito
  const deleteItem = async (item: ArticuloCarrito) => {
    const token = localStorage.getItem("token");
    if (!token) return; // Si no hay token, no hacemos nada

    const decoded = jwtDecode(token) ?? {};
    const userId = decoded.id;
    setCartItems(cartItems.filter((cartItem) => cartItem._id !== item._id));

    if (token) {
      try {
        await fetch(`http://localhost:5000/carrito/deleteItem/${userId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productoId: item._id,}),
        });
      } catch (error) {
        console.error("Error al eliminar producto del carrito en el backend:", error);
      }
    }
  };   

  // Migrar carrito cuando el usuario inicia sesión
  const migrateCart = async (items: ArticuloCarrito[]) => {
    try {
      const response = await fetch("http://localhost:5000/carrito/migrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            productoId: item._id,
            total_items: item.total_items,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Error al migrar el carrito");
      }

      console.log("Carrito migrado exitosamente");
    } catch (error) {
      console.error("Error en migrateCart:", error);
    }
  };

  // Calcular el total del carrito
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.precio * item.total_items, 0);
  };

  // Alternar la visibilidad del carrito
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  // Obtener la cantidad total de productos en el carrito
  const getTotalCartItems = () => {
    return cartItems.reduce((ack, item) => ack + item.total_items, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        getCartTotal,
        toggleCart,
        getTotalCartItems,
        deleteItem,
        migrateCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
};
