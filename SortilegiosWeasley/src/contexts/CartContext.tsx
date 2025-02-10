import { createContext, useState, useEffect, ReactNode }  from 'react';

import { ArticuloCarrito } from '../tipos';
import Cart from '../components/carritoCompras';

export const CartContext = createContext<{
    cartItems: ArticuloCarrito[];
    addToCart: (item: ArticuloCarrito) => void;
    removeFromCart: (item: ArticuloCarrito) => void;
    getCartTotal: () => number;
    toggleCart: () => void;
}>({
    cartItems: [],
    addToCart: () => {},
    removeFromCart: () => {},
    getCartTotal: () => 0,
    toggleCart: () => false,
})

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {

    const [ isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState<ArticuloCarrito[]>(() => {
        // Obtener el valor de localStorage
        const storedCartItems = localStorage.getItem("cartItems");
      
        // Si hay un valor, parsearlo como JSON; de lo contrario, devolver un array vacío
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    });

     // Guardar los Articulos en el carrito desde el navegador
     useEffect(() => {
      localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }, [cartItems])

    const addToCart = (item: ArticuloCarrito) => {

      const isItemInCart = cartItems.find((cartItem:ArticuloCarrito) => cartItem.nombre === item.nombre);

      if (isItemInCart) {
        setCartItems(
            cartItems.map((cartItem: ArticuloCarrito) => 
            cartItem.nombre === item.nombre
                ? { ...cartItem, total_items: cartItem.total_items + 1 }
                : cartItem
            )
        )
      } else {
        setCartItems([...cartItems, {...item, total_items: 1}])
      }

    };

    const removeFromCart = (item: ArticuloCarrito) => {
      const isItemInCart = cartItems.find((cartItem:ArticuloCarrito) => cartItem.nombre === item.nombre);

      if (isItemInCart?.total_items === 1){
        setCartItems(cartItems.filter((cartItem) => cartItem.nombre !== item.nombre))
      } else {

        setCartItems(
            cartItems.map((cartItem) =>
              cartItem.nombre === item.nombre
                ? { ...cartItem, total_items: cartItem.total_items - 1}
                : cartItem
          )
        );
      }
    }

    const getCartTotal = () => {
        return cartItems.reduce((total:number, item: ArticuloCarrito) => total + (item.precio * item.total_items), 0 )
    }

    const toggleCart = () => setIsCartOpen(!isCartOpen)
    
    return (
      <CartContext.Provider
         value = {{
          cartItems,
          addToCart,
          removeFromCart,
          getCartTotal,
          toggleCart
         }}>
          {children}
         </CartContext.Provider>
    )
}