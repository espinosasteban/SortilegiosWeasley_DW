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
import CambiarContraseña from "./paginas/ProcesoLoginUsuario/cambiarContraseña/";
import AppProfile from "./paginas/MiPerfil/App_perfil"; // Agregado
import AppAdmin from "./paginas/ProductosAdministrador/AppAdmin"; // Agregado
// Contexts 
import { CartProvider } from './contexts/CartContext.tsx';
import { AuthProvider } from "./paginas/ProcesoLoginUsuario/AuthContext"; // Agregado
// Types
import { Articulo } from "./tipos.tsx";
// Hooks
import { useState } from 'react';
import ProcesoCompra from './paginas/ProcesoCompra/procesoCompra.tsx';



function App() {
    const [seccion, setSeccion] = useState<string | null>(null);
    const [_, setProducto] = useState<Articulo | null>(null);

    return (
            <AuthProvider> {/* Envuelve todo con AuthProvider */}
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
                                <Route path="/perfil" element={<AppProfile/>} /> {/* Agregado */}
                                <Route path="/admin" element={<AppAdmin/>} /> {/* Agregado */}
                                <Route path ="/procesoCompra" element={<ProcesoCompra infoContacto={true} />} />
                        </Routes>
                        </main>
                    </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
