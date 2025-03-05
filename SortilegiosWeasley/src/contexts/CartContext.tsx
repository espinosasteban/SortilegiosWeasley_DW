import { createContext, useState, useEffect } from "react";
import { ArticuloCarrito, Carrito } from "../tipos";
import {jwtDecode} from "jwt-decode";


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

  // useEffect(() => {
  //   const storedToken = localStorage.getItem("token");
  //   if (storedToken) {
  //     setToken(storedToken);
  //   }
  // }, []);

  // Escuchar cambios en localStorage
  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     const newToken = localStorage.getItem("token");
  //     if (newToken !== token) {
  //       setToken(newToken);
  //     }
  //   };

  //   window.addEventListener("storage", handleStorageChange);
  //   return () => window.removeEventListener("storage", handleStorageChange);
  // }, [token]);


  // Cargar carrito del usuario autenticado
  useEffect(() => {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token) ?? '';
    const fetchCart = async () => {
      if (token) {
        try {
          const response = await fetch(`http://localhost:5000/carrito/${decoded.id}`, {
            method:"GET",
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.ok) {
            const data = await response.json();
            setCarrito(data)
            // setCartItems(data || []);
          } 
        } catch (error) {
          console.error("Error al obtener el carrito:", error);
        }
      } else {
        setCartItems([]);
        //TODO: leer los datos del carrito de compras en el local storage, apenas los lea los guarda en setCartItems
      }
    };
    fetchCart();
  }, []);

  const addToCart = async (item: ArticuloCarrito) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem._id === item._id);
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token) ?? '';
  
    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, total_items: cartItem.total_items + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, total_items: 1 }]);
    }
  
    if ( carrito.items ) {
      try {
        const carritoId = carrito?._id
        const response = await fetch(`http://localhost:5000/carrito/${carritoId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: decoded.id, // Asegurarse de que esto coincide con el backend
            // items: [{ productoId: item._id, total_items: 1 }],
            items: carrito?.items
          }),
        });
    
        const data = await response.json();
        console.log(`productos en base de datos ${data}`);
        //TODO guardar estos datos en setCarrito
        console.log("🔍 Respuesta del backend al agregar producto:", data);
    
        if (!response.ok) {
          console.error("❌ Error en la petición:", data);
        }
      } catch (error) {
        console.error("❌ Error al agregar producto al carrito en el backend:", error);
      }
    }
    else {
      try {
        const response = await fetch(`http://localhost:5000/carrito`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: decoded.id, // Asegurarse de que esto coincide con el backend
            items: cartItems.map(({ _id, total_items }) => ({
              productoId: _id,
              total_items,
            })),
          }),
        });
    
        const data = await response.json();
        console.log(`productos en base de datos ${data}`);
        //TODO guardar estos datos en setCarrito
        console.log("🔍 Respuesta del backend al agregar producto:", data);
    
        if (!response.ok) {
          console.error("❌ Error en la petición:", data);
        }
      } catch (error) {
        console.error("❌ Error al agregar producto al carrito en el backend:", error);
      }
    }

    }

  // Remover un producto del carrito
  const removeFromCart = async (item: ArticuloCarrito) => {
    console.log("removeFromCart")
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
        await fetch(`http://localhost:5000/carrito/${item._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ total_items: isItemInCart.total_items - 1 }),
        });
      } catch (error) {
        console.error("Error al remover producto del carrito en el backend:", error);
      }
    }
  };

  // Eliminar producto del carrito
  const deleteItem = async (item: ArticuloCarrito) => {
    setCartItems(cartItems.filter((cartItem) => cartItem._id !== item._id));

    if (token) {
      try {
        await fetch(`http://localhost:5000/carrito/${item._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
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
  );
};
