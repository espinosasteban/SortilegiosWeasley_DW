import React from 'react';
import { Link, useLocation } from "react-router";

const Navbar_perfil: React.FC = () => {
    const location = useLocation(); // Obtiene la ruta actual

    return (
      <nav className="navbar_perfil">
        <div><h2>¡Hola, Muggle! </h2></div>
        <ul>
          <li className={location.pathname === "/mi-informacion" ? "active" : ""}>
            <Link to="/mi-informacion">Mi Información</Link>
          </li>
          <li className={location.pathname === "/mis-direcciones" ? "active" : ""}>
            <Link to="/mis-direcciones">Mis Direcciones</Link>
          </li>
          <li className={location.pathname === "/historial-compras" ? "active" : ""}>
            <Link to="/historial-compras">Historial de Compras</Link>
          </li>
        </ul>
      </nav>
    );
};

export default Navbar_perfil;
