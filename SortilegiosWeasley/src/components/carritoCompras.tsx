import '../styles/carritoCompras.css';

// External components
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
// Types
import { ArticuloCarrito } from '../tipos.tsx'

// Contexts
import { CartContext } from '../contexts/CartContext.tsx';
// Hooks
import { useContext } from 'react';

/* 
TODOS:

Corregir:
- Agregar a cart el boton de Ir a pagar.
- Agregarle mejores estilos

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


const CartItem:  React.FC<ItemProps> = ( {item, addToCart, removeFromCart, deleteItem} ) => (
    <div className='item-wrapper'>
        <div>
            <div className='item-header'>
                <div className='item-header-top'>
                <h3>{item.nombre}</h3>
                <DeleteIconButton onClick = {() => deleteItem(item)} />
                </div>
                <img className='img-shopping-cart' src={item.imagen} alt = {item.nombre} />
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
                  onClick = {() => removeFromCart(item)}>
                    -
                </Button>
                <p>{item.total_items}</p>
                <Button
                  size='small'
                  disableElevation
                  variant='contained'
                  onClick={() => addToCart(item)}
                >
                    +
                </Button>


            </div>
        </div>
        
    </div>

)

const Cart: React.FC<CartProps> = () => {
    const { cartItems, addToCart, removeFromCart, getCartTotal, deleteItem } = useContext(CartContext)
    return (
        <aside className='cart-wrapper'>
            <h2> Carrito de compras</h2>
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
            <h2>Total: ${getCartTotal().toFixed(2)}</h2>
            <Button 
            size='medium'
            disableElevation
            variant='contained'>
                Ir a pagar
            </Button>
        </aside>

        )
}
export default Cart

