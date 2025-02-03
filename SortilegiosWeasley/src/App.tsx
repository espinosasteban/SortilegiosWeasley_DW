import './App.css';
import NavBar from "./components/NavBar.tsx";
import { BrowserRouter, Routes, Route } from "react-router"; // Importar Routes y Route
import LandingPage from "./paginas/Principal/landingPage.tsx";
import VistaSeccion from "./paginas/Principal/vistaSeccion.tsx"; // Importa tu vista
import { useState } from 'react';
import VistaProducto from "./paginas/ProcesoCompra/detalleProductoEntrada.tsx";
import { articulos } from "./mocks/articulos.tsx";
import {Articulo} from "./tipos.tsx";
import DetalleResena from "./paginas/ProcesoCompra/detalleProductoEntrada.tsx";
import Detalle from "./paginas/ProcesoCompra/detalleProductoEntrada.tsx";
import DetalleProducto from "./paginas/ProcesoCompra/detalleProductoEntrada.tsx";


function App() {
    const [seccion, setSeccion] = useState<string | null>(null);
    const [producto, setProducto] = useState<Articulo | null>(null);



    return (
        <BrowserRouter>
            <NavBar setSeccion={setSeccion} /> {/* Pasar la función para actualizar la sección */}
            <main className="mainApp">
                <Routes>
                    {/* Define las rutas */}
                    <Route path="/" element={<LandingPage />} /> {/* Ruta para Landing Page */}
                    <Route path="/vistaSeccion" element={<VistaSeccion seccion={seccion}  setProducto={setProducto}/>} /> {/* Ruta para Vista Sección */}
                    <Route path="/producto/:nombreProducto" element={<VistaProducto producto={producto}/>} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
