import '../styles/NavBar.css';
import { Link } from "react-router"; // Importa Link

// Types
import ArticuloCarrito  from './carritoCompras';
// External Components
import Badge from '@mui/material/Badge'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Drawer } from '@mui/material';
// Components
import Cart  from './carritoCompras'
// Hooks
import { useState, useContext } from 'react'
// Contexts
import { CartContext } from '../contexts/CartContext.tsx';

import { useAuth } from '../paginas/ProcesoLoginUsuario/AuthContext';

interface NavBarProps {
    setSeccion: (seccion: string | null) => void;
}

function NavBar({ setSeccion }: NavBarProps) {
    const [ cartOpen, setCartOpen] = useState(false)
    const { cartItems, toggleCart, addToCart,
            removeFromCart, getCartTotal, getTotalCartItems} = useContext(CartContext)

    const { usuario, logout } = useAuth();

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                {/* Usa <Link> para navegar entre las rutas */}
                <li className="navbar-item">
                    <Link to="/"><img className="logo" src="../../public/iconoPagina.png" alt="Tu mundo Muggle"/></Link> {/* Enlace a la Landing Page */}
                </li>
                <li className="navbar-item">
                    <Link to="/vistaSeccion" onClick={() => setSeccion('Bromas')}>Bromas</Link> {/* Enlace a Vista Sección */}
                    <Link to="/vistaSeccion" onClick={() => setSeccion('Explosivos')}>Explosivos</Link> {/* Enlace a Vista Sección */}
                    <Link to="/vistaSeccion" onClick={() => setSeccion('Magia Muggle')}>Magia Muggle</Link> {/* Enlace a Vista Sección */}
                    <Link to="/vistaSeccion" onClick={() => setSeccion('Defensa Personal')}>Defensa Personal</Link> {/* Enlace a Vista Sección */}
                    <Link to="/vistaSeccion" onClick={() => setSeccion('Amor y Belleza')}>Amor y Belleza</Link> {/* Enlace a Vista Sección */}
                    <Link to="/vistaSeccion" onClick={() => setSeccion('Dulces')}>Dulces</Link> {/* Enlace a Vista Sección */}
                </li>
                <li className="navbar-item">
                    <Link to="/vistaSeccion" onClick={() => setSeccion('')}>Buscar</Link> {/* Enlace a Vista Sección */}
                </li>
                <li className="navbar-item">
                    <Drawer anchor='right' open = {cartOpen} onClose={() => setCartOpen(false)}>
                        <Cart
                            cartItems={cartItems}
                            addToCart={addToCart}
                            removeFromCart={removeFromCart}></Cart>
                    </Drawer>
                    <button onClick={() => setCartOpen(true)}>
                        <Badge badgeContent = {getTotalCartItems()} color = 'error'>
                            <AddShoppingCartIcon />
                        </Badge>
                    </button>
                </li>
                <li className="navbar-item">
                    {usuario ? (
                        <>
                            <Link to="/perfil">Mi Perfil</Link>
                            <button onClick={logout}>Cerrar Sesión</button>
                        </>
                    ) : (
                        <Link to="/login">Iniciar Sesión</Link>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
