import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../paginas/ProcesoLoginUsuario/AuthContext";
import { ArticuloCarrito, Carrito } from "../tipos";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:5000/carrito"

export const CartContext = createContext<{
  cartItems: ArticuloCarrito[];
  addToCart: (item: ArticuloCarrito) => void;
  removeFromCart: (item: ArticuloCarrito) => void;
  getCartTotal: () => number;
  getTotalCartItems: () => number;
  deleteItem: (item: ArticuloCarrito) => void;
}>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  getCartTotal: () => 0,
  getTotalCartItems: () => 0,
  deleteItem: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { usuario } = useAuth();
  const [cartItems, setCartItems] = useState<ArticuloCarrito[]>([]);
  const [_, setCarrito] = useState<Carrito>({} as Carrito);


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
        const response = await fetch(`${API_URL}/${decoded.id}`, {
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
  }, [usuario]);

const addToCart = async (item: ArticuloCarrito, cantidad: number = 1) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  const decoded = jwtDecode<{ id: string }>(token);
  const userId = decoded.id;

  if (!userId) {
    console.error("Error: No se encontró el ID del usuario en el token.");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/addCart`, {
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

    if (!response.ok) {
      console.error("Error agregando producto al carrito");
      return;
    }
    // Obtener el carrito después de la actualización de la BD
    const updatedCartResponse = await fetch(`${API_URL}/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (updatedCartResponse.ok) {
      const updatedCart = await updatedCartResponse.json();
      setCarrito(updatedCart);
      setCartItems(updatedCart.items || []);
    }
  } catch (error) {
    console.error("Error al manejar el carrito:", error);
  }
};


  // Remover un sólo item del carrito
  const removeFromCart = async (item: ArticuloCarrito) => {
    const token = localStorage.getItem("token");
    if (!token) return; // Si no hay token, no hacemos nada
  
    const decoded = jwtDecode<{ id: string }>(token);
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
        await fetch(`${API_URL}/decreaseItemQty/${userId}`, {
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

  // Eliminar un producto del carrito
  const deleteItem = async (item: ArticuloCarrito) => {
    const token = localStorage.getItem("token");
    if (!token) return; 

    const decoded = jwtDecode<{ id: string }>(token);
    const userId = decoded.id;
    setCartItems(cartItems.filter((cartItem) => cartItem._id !== item._id));

    if (token) {
      try {
        await fetch(`${API_URL}/deleteItem/${userId}`, {
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

  // Calcular el total del carrito
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.precio * item.total_items, 0);
  };

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
        getTotalCartItems,
        deleteItem,
      }}
    >
      {children}
    </CartContext.Provider>
  )
};
