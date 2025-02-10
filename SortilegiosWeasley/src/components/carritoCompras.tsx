import '../styles/carritoCompras.css';

// External components
import Button from '@mui/material/Button';
// Types
import { ArticuloCarrito } from '../tipos.tsx'

// Contexts
import { CartContext } from '../contexts/CartContext.tsx';
// Hooks
import { useContext } from 'react';



type ItemProps =  {
    item: ArticuloCarrito
    cantidad?: number;
    addToCart: (clickedItem: ArticuloCarrito) => void;
    removeFromCart: (item: ArticuloCarrito) => void;
}

type CartProps = {
    cartItems: ArticuloCarrito[];
    addToCart: (clickedItem: ArticuloCarrito) => void;
    removeFromCart: (item: ArticuloCarrito) => void;
}


const CartItem:  React.FC<ItemProps> = ( {item, addToCart, removeFromCart} ) => (
    <div className='item-wrapper'>
        <div>
            <div>
                <h3>{item.nombre}</h3>
                <p>🗑️</p>
            </div>
            <div className = 'information'>
                <p>Precio: ${item.precio}</p>
                <p>Total</p>

            </div>
            <div className = 'buttons'>
                <p>Cantidad</p>
                <Button
                  size = 'small'
                  disableElevation
                  variant='contained'
                  onClick = {() => addToCart}>
                    -
                </Button>
                <p>{item.total_items}</p>
                <Button
                  size='small'
                  disableElevation
                  variant='contained'
                  onClick={() => removeFromCart(item)}
                >
                    +
                </Button>

            </div>
        </div>

    </div>

)

const Cart: React.FC<CartProps> = () => {
    const { cartItems, addToCart, removeFromCart, getCartTotal } = useContext(CartContext)
    return (
        <aside className='cart-wrapper'>
            <h2> Carrito de compras</h2>
            {cartItems.length === 0 ? <p>Todavía no hay productos</p> : null}
            {cartItems.map( item => (
                <CartItem
                  key = {item.nombre}
                  item = {item}
                  addToCart={ addToCart}
                  removeFromCart={ removeFromCart}>
                
                </CartItem> 
            ))}
            <h2>Total: ${getCartTotal().toFixed(2)}</h2>
        </aside>

        )
}
export default Cart

