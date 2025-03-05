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
import ProcesoCompra from './paginas/ProcesoCompra/procesoCompra.tsx';
import AgradecimientoCompra from './paginas/ProcesoCompra/agradecimientoCompra.tsx';

// Contexts 
import { CartProvider } from './contexts/CartContext.tsx';
import { AuthProvider } from "./paginas/ProcesoLoginUsuario/AuthContext"; // Agregado
// Types
import { Articulo } from "./tipos.tsx";
// Hooks
import { useEffect, useState } from 'react';

function App() {
    const [seccion, setSeccion] = useState<string | null>(null);
    const [productos, setProductos] = useState<Array<Articulo>>([]);
    const [_, setProducto] = useState<Articulo | null>(null);

    useEffect(() => {
        console.log('Entré al useEffect');
        async function obtenerProductos(){
            const response = await fetch('http://localhost:5000/producto/');
            console.log(response);
            if (!response.ok){
                console.log('Error al obtener productos', response.statusText);
                return
            }
            const productos = await response.json();
            setProductos(productos);
        }
        obtenerProductos();
        return;
    }, [productos.length]);


    return (
            <AuthProvider> {/* Envuelve todo con AuthProvider */}
                <CartProvider>
                    <BrowserRouter>
                        <NavBar setSeccion={setSeccion} />
                        <main className="mainApp">
                            <Routes>
                                <Route path="/" element={<LandingPage productos={productos} setSeccion={setSeccion} setProducto={setProducto}/>} />
                                <Route path="/vistaSeccion" element={<VistaSeccion nombreSeccion={seccion} setProducto={setProducto}  productos={productos}/>} />
                                <Route path="/producto/:nombreProducto" element={<VistaProducto productos={productos} setProducto={setProducto} />} />
                                <Route path="/login" element={<Login />} /> 
                                <Route path="/crearCuenta" element={<CrearCuenta />} />
                                <Route path="/cambiarContraseña" element={<CambiarContraseña />} />
                                <Route path="/perfil" element={<AppProfile/>} /> {/* Agregado */}
                                <Route path="/gestion-producto" element={<AppAdmin/>} /> {/* Agregado */}
                                <Route path ="/procesoCompra" element={<ProcesoCompra infoContacto={true} />} />
                                <Route path ="/gracias" element={<AgradecimientoCompra/>} />
                        </Routes>
                        </main>
                    </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
