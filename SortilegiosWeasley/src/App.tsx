import './App.css';
import NavBar from "./components/NavBar.tsx";
import { BrowserRouter, Routes, Route } from "react-router"; // Importar Routes y Route
import LandingPage from "./paginas/Principal/landingPage.tsx";
import VistaSeccion from "./paginas/Principal/vistaSeccion.tsx"; // Importa tu vista
import { useState } from 'react';

function App() {
    const [seccion, setSeccion] = useState<string | null>(null);

    return (
        <BrowserRouter>
            <NavBar setSeccion={setSeccion} /> {/* Pasar la función para actualizar la sección */}
            <main>
                <Routes>
                    {/* Define las rutas */}
                    <Route path="/" element={<LandingPage />} /> {/* Ruta para Landing Page */}
                    <Route path="/vistaSeccion" element={<VistaSeccion seccion={seccion} />} /> {/* Ruta para Vista Sección */}
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
