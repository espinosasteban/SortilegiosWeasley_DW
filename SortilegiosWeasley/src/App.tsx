import './App.css';
import { BrowserRouter, Routes, Route } from "react-router";
// Global Components
import NavBar from "./components/NavBar.tsx";
// Pages
import LandingPage from "./paginas/Principal/landingPage.tsx";
import VistaSeccion from "./paginas/Principal/vistaSeccion.tsx";
import VistaProducto from "./paginas/ProcesoCompra/detalleProductoEntrada.tsx";
import Login from "./paginas/ProcesoLoginUsuario/login/"; 
import CrearCuenta from './paginas/ProcesoLoginUsuario/crearCuenta/';
import CambiarContraseña from './paginas/ProcesoLoginUsuario/cambiarContraseña/';
// Contexts 
import { CartProvider } from './contexts/CartContext.tsx';
// Types
import { Articulo } from "./tipos.tsx";
// Hooks
import { useState } from 'react';

function App() {
    const [seccion, setSeccion] = useState<string | null>(null);
    const [producto, setProducto] = useState<Articulo | null>(null);

    return (
        <CartProvider>
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
        </CartProvider>
    );
}

export default App;
