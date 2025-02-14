import React from 'react';
import { Link, useLocation } from "react-router-dom";

const NavbarAdmin: React.FC = () => {
    const location = useLocation(); // Obtiene la ruta actual

    return (
      <nav className="navbar_admin">
        <div><h2>¡Hola, Administrador! </h2></div>
        <ul>
          <li className={location.pathname === "/gestion-producto" ? "active" : ""}>
            <Link to="/gestion-producto">Gestión de productos</Link>
          </li>
        </ul>
      </nav>
    );
};

export default NavbarAdmin;
