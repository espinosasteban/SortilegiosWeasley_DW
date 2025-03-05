import '../styles/carritoCompras.css';

// External components
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
// Types
import { ArticuloCarrito } from '../tipos.tsx'

// Contexts
import { CartContext } from '../contexts/CartContext.tsx';
// Hooks
import { useContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router';


interface DeleteIconButtonProps {
    onClick: () => void; 
  }

export const DeleteIconButton: React.FC<DeleteIconButtonProps> = ( { onClick }) => {
    return (
      <IconButton
        size="medium"
        aria-label="Eliminar"
        onClick = {onClick}
        sx={{
          color: 'black', 
        }}
      >
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    );
  };

  export type ItemProps = {
    item: ArticuloCarrito;
    addToCart: (clickedItem: ArticuloCarrito) => void;
    removeFromCart: (item: ArticuloCarrito) => void;
    deleteItem: (item: ArticuloCarrito) => void;
    compact?: boolean; 
  };
  

  export const CartItem: React.FC<ItemProps> = ({ item, addToCart, removeFromCart, deleteItem }) => {
      // const [seccionNombre, setSeccionNombre] = useState<string | null>(null);
      
      // useEffect(() => {
      //     async function obtenerSeccion() {
      //         if (!item.seccion) return;
  
      //         try {
      //             const response = await fetch(`http://localhost:5000/seccion/${item.seccion}`);
                  
      //             if (!response.ok) {
      //                 console.error('Error al obtener la sección:', response.statusText);
      //                 return;
      //             }
  
      //             const seccionData = await response.json();
      //             setSeccionNombre(seccionData.nombre);
      //         } catch (error) {
      //             console.error('Error en la petición de la sección:', error);
      //         }
      //     }
  
      //     obtenerSeccion();
      // }, [item.seccion]);
  
      return (
          <div className="block-cart-item">
              <img className="block-cart-item-image" src={item.img} alt={item.nombre} />
              <div className="block-cart-item-info">
                  <div className="block-cart-item-header">
                      <h3 className="block-cart-item-name">{item.nombre}</h3>
                      <DeleteIconButton onClick={() => deleteItem(item)} />
                  </div>
                  <p className="block-cart-item-effect">
                      {item.seccion ? item.seccion : "Cargando sección..."}
                  </p>
                  <div className="block-cart-item-bottom">
                      <div className="block-cart-item-quantity">
                          <button className="block-quantity-btn" onClick={() => removeFromCart(item)}>-</button>
                          <p className='block-total-items'>{item.total_items}</p>
                          <button className="block-quantity-btn" onClick={() => addToCart(item)}>+</button>
                      </div>
                      <p className="block-cart-item-price">$ {Number(item.precio * item.total_items).toFixed(2)}</p>
                  </div>
              </div>
          </div>
      );
  };
  

export type CartProps = {
  cartItems: ArticuloCarrito[];
  addToCart: (clickedItem: ArticuloCarrito) => void;
  removeFromCart: (item: ArticuloCarrito) => void;
}

const Cart: React.FC<CartProps> = () => {
    const navigate = useNavigate();
    const { cartItems, addToCart, removeFromCart, getCartTotal, deleteItem } = useContext(CartContext)

    return (
        <aside className='block-cart-wrapper'>
            <h2 className='block-cart-wrapper-title'> Carrito de compras</h2>
            {cartItems.length === 0 ? <p>Todavía no hay productos</p> : null}
            {cartItems.map( item => (
                <CartItem
                  key = {item.nombre}
                  item = {item}
                  addToCart={ addToCart}
                  removeFromCart={ removeFromCart}
                  deleteItem={deleteItem}>
                
                </CartItem> 
            ))}
            {/* Mostrar el botón de ir a pagar y el total sólo si hay items en el carrito */}
            {cartItems.length > 0 ?<h2>Total: ${getCartTotal().toFixed(2)}</h2>: null }
            
            
            {cartItems.length > 0 ?
            <button className='block-cart-wrapper-pay-btn' onClick={() => navigate("/procesoCompra")}>Ir a pagar</button> : null}
            
        </aside>

        )
}
export default Cart
