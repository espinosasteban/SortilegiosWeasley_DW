import '../styles/NavBar.css';
import { Link } from "react-router"; // Importa Link

// Types
import ArticuloCarrito  from './carritoCompras';
// External Components
import Badge from '@mui/material/Badge'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
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
    const [cartOpen, setCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isRightMenuOpen, setIsRightMenuOpen] = useState(false); // Nuevo estado para el menú de la derecha
    const { cartItems, toggleCart, addToCart, removeFromCart, getCartTotal, getTotalCartItems } = useContext(CartContext);
    const { usuario, logout } = useAuth();

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                {/* Logo */}
                <li className="navbar-item">
                    <Link to="/"><img className="logo" src="../../public/iconoPagina.png" alt="Tu mundo Muggle"/></Link>
                </li>

                {/* Menú de secciones (centro) */}
                <li className="navbar-item menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    ☰
                </li>
                <div className={`navbar-sections ${isMenuOpen ? 'open' : ''}`}>
                    <li className="navbar-item">
                        <Link to="/vistaSeccion" onClick={() => setSeccion('Bromas')}>Bromas</Link>
                        <Link to="/vistaSeccion" onClick={() => setSeccion('Explosivos')}>Explosivos</Link>
                        <Link to="/vistaSeccion" onClick={() => setSeccion('Magia Muggle')}>Magia Muggle</Link>
                        <Link to="/vistaSeccion" onClick={() => setSeccion('Defensa Personal')}>Defensa Personal</Link>
                        <Link to="/vistaSeccion" onClick={() => setSeccion('Amor y Belleza')}>Amor y Belleza</Link>
                        <Link to="/vistaSeccion" onClick={() => setSeccion('Dulces')}>Dulces</Link>
                    </li>
                </div>

                {/* Menú de la derecha (carrito, buscar, inicio de sesión) */}
                <li className="navbar-item right-menu-icon" onClick={() => setIsRightMenuOpen(!isRightMenuOpen)}>
                    🛒
                </li>
                <div className={`right-menu ${isRightMenuOpen ? 'open' : ''}`}>
                    <li className="navbar-item">
                        <Link to="/vistaSeccion" onClick={() => setSeccion('')}>Buscar</Link>
                    </li>
                    <li className="navbar-item">
                        <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}
                            PaperProps= {{
                                sx: {
                                  backgroundColor: " #f5f5f5;",
                                }
                                }}>
                            <Cart
                                cartItems={cartItems}
                                addToCart={addToCart}
                                removeFromCart={removeFromCart}></Cart>
                        </Drawer>
                        <IconButton onClick={() => setCartOpen(true)} aria-label="Carrito de Compras">
                            <Badge badgeContent={getTotalCartItems()} color="error">
                                <AddShoppingCartIcon />
                            </Badge>
                        </IconButton>
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
                </div>
            </ul>
        </nav>
    );
}

export default NavBar;
