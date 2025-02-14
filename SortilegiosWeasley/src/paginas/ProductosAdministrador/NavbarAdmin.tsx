import React from 'react';
import { Link, useLocation } from "react-router-dom";
import './styles.css';
import VoldemortImg from '../../assets/Login/Voldemort.png';

const NavbarAdmin: React.FC = () => {
    const location = useLocation(); // Obtiene la ruta actual

    return (
      <nav className="navbar_admin">
      <div className='admin-container'>
        <div className='admin-header'>
          <h2 className='AdminH1'>¡Hola, Administrador! </h2>
          <img src={VoldemortImg} alt="Voldemort" className="voldemort-img" />
        </div>
        <ul>
          <li className={location.pathname === "/gestion-producto" ? "active" : ""}>
            <Link to="/gestion-producto">Gestión de productos</Link>
          </li>
        </ul>
      </div>
      </nav>
    );
};

export default NavbarAdmin;
