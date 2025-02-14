import React from 'react';
import { Link, useLocation } from "react-router-dom";

const NavbarAdmin: React.FC = () => {
    const location = useLocation(); // Obtiene la ruta actual

    return (
      <nav className="NavbarAdmin">
        <div><h2>¡Bienvenido, Administrador! </h2></div>
        <ul>
          <li className={location.pathname === "/gestion-productos" ? "active" : ""}>
            <Link to="/gestion-productos">Gestión de Productos</Link>
          </li>
        </ul>
      </nav>
    );
};

export default NavbarAdmin;
