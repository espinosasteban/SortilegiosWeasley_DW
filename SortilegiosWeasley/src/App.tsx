import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router";
import LandingPage from "./paginas/Principal/landingPage";
import VistaSeccion from "./paginas/Principal/vistaSeccion";
import { useState } from "react";
import VistaProducto from "./paginas/ProcesoCompra/detalleProductoEntrada";
import Login from "./paginas/ProcesoLoginUsuario/login"; 
import CrearCuenta from "./paginas/ProcesoLoginUsuario/crearCuenta";
import CambiarContraseña from "./paginas/ProcesoLoginUsuario/cambiarContraseña";
import UserProfile from "./paginas/MiPerfil/informacionPerfil"; // Agregado
import { AuthProvider } from "./paginas/ProcesoLoginUsuario/AuthContext"; // Agregado
import { Articulo } from "./tipos";

function App() {
    const [seccion, setSeccion] = useState<string | null>(null);
    const [producto, setProducto] = useState<Articulo | null>(null);

    return (
        <AuthProvider> {/* Envuelve todo con AuthProvider */}
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
                        <Route path="/perfil" element={<UserProfile />} /> {/* Agregado */}
                    </Routes>
                </main>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
