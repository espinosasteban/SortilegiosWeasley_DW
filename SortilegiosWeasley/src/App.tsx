import './App.css';
import NavBar from "./components/NavBar.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import LandingPage from "./paginas/Principal/landingPage.tsx";
import VistaSeccion from "./paginas/Principal/vistaSeccion.tsx";
import { useState } from 'react';
import VistaProducto from "./paginas/ProcesoCompra/detalleProductoEntrada.tsx";
import Login from "./paginas/ProcesoLoginUsuario/login/"; 
import CrearCuenta from './paginas/ProcesoLoginUsuario/crearCuenta/';
import CambiarContraseña from './paginas/ProcesoLoginUsuario/cambiarContraseña/';
import { Articulo } from "./tipos.tsx";

function App() {
    const [seccion, setSeccion] = useState<string | null>(null);
    const [producto, setProducto] = useState<Articulo | null>(null);

    return (
        <BrowserRouter>
            <NavBar setSeccion={setSeccion} />
            <main className="mainApp">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/vistaSeccion" element={<VistaSeccion seccion={seccion} setProducto={setProducto} />} />
                    <Route path="/producto/:nombreProducto" element={<VistaProducto />} />
                    <Route path="/login" element={<Login />} /> 
                    <Route path="/crearCuenta" element={<CrearCuenta />} />
                    <Route path="/cambiarContraseña" element={<CambiarContraseña />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
