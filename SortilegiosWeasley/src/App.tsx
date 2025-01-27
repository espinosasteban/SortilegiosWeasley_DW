import './App.css';
import NavBar from "./components/NavBar.tsx";
import { BrowserRouter, Routes, Route } from "react-router"; // Importar Routes y Route
import LandingPage from "./paginas/Principal/landingPage.tsx";
import VistaSeccion from "./paginas/Principal/vistaSeccion.tsx"; // Importa tu vista

function App() {
    return (
        <BrowserRouter>
            <NavBar /> {/* La barra de navegación siempre visible */}
            <main>
                <Routes>
                    {/* Define las rutas */}
                    <Route path="/" element={<LandingPage />} /> {/* Ruta para Landing Page */}
                    <Route path="/vistaSeccion" element={<VistaSeccion />} /> {/* Ruta para Vista Sección */}
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
