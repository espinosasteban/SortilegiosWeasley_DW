import '../styles/NavBar.css';
import { Link } from "react-router"; // Importa Link

function NavBar() {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                {/* Usa <Link> para navegar entre las rutas */}
                <li className="navbar-item">
                    <Link to="/">Inicio</Link> {/* Enlace a la Landing Page */}
                </li>
                <li className="navbar-item">
                    <Link to="/vistaSeccion">Vista Sección</Link> {/* Enlace a Vista Sección */}
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
