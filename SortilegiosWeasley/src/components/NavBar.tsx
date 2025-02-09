import '../styles/NavBar.css';
import { Link } from "react-router"; // Importa Link

// Components
import Cart  from './carritoCompras'
// Hooks
import { useState } from 'react'

interface NavBarProps {
    setSeccion: (seccion: string | null) => void;
}

function NavBar({ setSeccion }: NavBarProps) {
    const [cartOpen, setCartOpen] = useState(false)
    {console.log(cartOpen)}
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
                <li onClick={() => setCartOpen(!cartOpen)} className="navbar-item">
                    Carrito
                </li>
                <li className="navbar-item">
                    <Link to='detalleUsuario'>Usuario</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
