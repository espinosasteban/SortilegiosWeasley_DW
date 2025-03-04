import { createContext, useState, useEffect, ReactNode } from "react";

// Types
import { ArticuloCarrito } from "../tipos";

export const CartContext = createContext<{
  cartItems: ArticuloCarrito[];
  addToCart: (item: ArticuloCarrito) => void;
  removeFromCart: (item: ArticuloCarrito) => void;
  getCartTotal: () => number;
  toggleCart: () => void;
  getTotalCartItems: () => number;
  deleteItem: (item: ArticuloCarrito) => void;
  migrateCart: (items) => [];
}>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  getCartTotal: () => 0,
  toggleCart: () => false,
  getTotalCartItems: () => 0,
  deleteItem: () => {},
  migrateCart: () => [],
});

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<ArticuloCarrito[]>(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const token = localStorage.getItem("token"); 
  const user = localStorage.getItem("user"); 

  const addToCart = async (item: ArticuloCarrito) => {
    const isItemInCart = cartItems.find(cartItem => cartItem._id === item._id);

    if (isItemInCart) {
      setCartItems(
        cartItems.map(cartItem =>
          cartItem._id === item._id
            ? { ...cartItem, total_items: cartItem.total_items + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, total_items: 1 }]);
    }

    if (user) {
      try {
        await fetch("/api/carrito/agregar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productoId: item._id, cantidad: 1 }),
        });
      } catch (error) {
        console.error("Error al agregar producto al carrito en el backend:", error);
      }
    }
  };

  const removeFromCart = async (item: ArticuloCarrito) => {
    const isItemInCart = cartItems.find(cartItem => cartItem._id === item._id);

    if (isItemInCart?.total_items === 1) {
      setCartItems(cartItems.filter(cartItem => cartItem._id !== item._id));
    } else {
      setCartItems(
        cartItems.map(cartItem =>
          cartItem._id === item._id
            ? { ...cartItem, total_items: cartItem.total_items - 1 }
            : cartItem
        )
      );
    }

    if (user) {
      try {
        await fetch("/api/carrito/remover", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productoId: item._id }),
        });
      } catch (error) {
        console.error("Error al remover producto del carrito en el backend:", error);
      }
    }
  };

  const deleteItem = async (item: ArticuloCarrito) => {
    setCartItems(cartItems.filter(cartItem => cartItem._id !== item._id));

    if (user) {
      try {
        await fetch("/api/carrito/eliminar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productoId: item._id }),
        });
      } catch (error) {
        console.error("Error al eliminar producto del carrito en el backend:", error);
      }
    }
  };

  const migrateCart = async (items) => {
    try {
        const response = await fetch('/api/carrito/migrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ items: items.map(item => ({
                productoId: item.id, 
                total_items: item.cantidad
            })) })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Error al migrar el carrito");
        }

        console.log("Carrito migrado exitosamente", data);
        return data.carrito;
    } catch (error) {
        console.error("Error en migrateCart:", error);
        throw error;
    }
};

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.precio * item.total_items, 0);
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

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
        migrateCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
