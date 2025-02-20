import '../styles/carritoCompras.css';

// External components
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
// Types
import { ArticuloCarrito } from '../tipos.tsx'

// Contexts
import { CartContext } from '../contexts/CartContext.tsx';
// Hooks
import { useContext } from 'react';

import { useNavigate } from 'react-router';


/*
TODO

Añadir un mismo tipo de fuente a todo el carrito que concuerde con la pág
Cuando se tenga la ventana del carrito a menos de un tamaño de pantalla que
aparezca un botón para cerrar el carrito
*/ 

interface DeleteIconButtonProps {
    onClick: () => void; 
  }

const DeleteIconButton: React.FC<DeleteIconButtonProps> = ( { onClick }) => {
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

type ItemProps =  {
    item: ArticuloCarrito
    cantidad?: number;
    addToCart: (clickedItem: ArticuloCarrito) => void;
    removeFromCart: (item: ArticuloCarrito) => void;
    deleteItem: (item: ArticuloCarrito) => void;
}

type CartProps = {
    cartItems: ArticuloCarrito[];
    addToCart: (clickedItem: ArticuloCarrito) => void;
    removeFromCart: (item: ArticuloCarrito) => void;
}


const CartItem: React.FC<ItemProps> = ({ item, addToCart, removeFromCart, deleteItem }) => (
  <div className="cart-item">
      <img className="cart-item-image" src={item.imagen} alt={item.nombre} />
      
      <div className="cart-item-info">
          <div className="cart-item-header">
              <h3 className="cart-item-name">{item.nombre}</h3>
              <DeleteIconButton onClick={() => deleteItem(item)} />
          </div>
          <p className="cart-item-effect">{item.seccion}</p>

          <div className="cart-item-bottom">
              <div className="cart-item-quantity">
                  <p>Cantidad</p>
                  <button className="quantity-btn" onClick={() => removeFromCart(item)}>-</button>
                  <p>{item.total_items}</p>
                  <button className="quantity-btn" onClick={() => addToCart(item)}>+</button>
              </div>
              <p className="cart-item-price">$ {Number(item.precio * item.total_items).toFixed(2)}</p>
          </div>
      </div>
  </div>
);


const Cart: React.FC<CartProps> = () => {
    const navigate = useNavigate();
    const { cartItems, addToCart, removeFromCart, getCartTotal, deleteItem } = useContext(CartContext)

    return (
        <aside className='cart-wrapper'>
            <h2 className='cart-wrapper-title'> Carrito de compras</h2>
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
            <button className='cart-wrapper-pay-btn' onClick={() => navigate("/procesoCompra")}>Ir a pagar</button> : null}
            
        </aside>

        )
}
export default Cart


/* 
TODOS:

Corregir:
- Agregarle mejores estilos
- Cuando tenga menos de un tamaño, haya un botón para poder cerrar el carrito
- Agregarle un gorrito al título 

*/