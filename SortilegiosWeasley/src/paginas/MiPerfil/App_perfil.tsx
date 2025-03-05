//import React, { useState } from 'react';
import Navbar_perfil from './Navbar_perfil';
import UserInfo from './user_info';
import './style.css';
import InfoBoton from "../../components/infoBoton";
import MisDirecciones from "../Direcciones/MisDirecciones";
import HistorialCompras from "../DetalleUsuario/historial";
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";

const AppProfile = () => {
    return (
        <Router>
          <div className="profile-container">
            <Navbar_perfil />
            <div className="profile-content">
              <Routes>
                <Route path="/perfil" element={<Navigate to="/mi-informacion" replace />} />
                <Route path="/mi-informacion" element={<UserInfo />} />
                <Route path="/historial-compras" element={<HistorialCompras />} />
                <Route path="/mis-direcciones" element={<MisDirecciones />} />
              </Routes>
            </div>
            <InfoBoton/>
          </div>
        </Router>
      );
};

export default AppProfile;