import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductoSeccion from '../components/ProductoSeccion.tsx'
import NavBar from "../components/NavBar.tsx";
import {articulosBromas, articulosMagiaMuggle} from "../mocks/articulos.tsx";

import LadingPage from '../paginas/Principal/landingPage.tsx'
function App() {
    const [seccionSeleccionada, setSeccionSeleccionada] = useState('bromas')
    const todosLosArticulos = [...articulosBromas, ...articulosMagiaMuggle];

    const productosFiltrados = seccionSeleccionada
        ? todosLosArticulos.filter(
            (articulo) =>
                articulo.seccion.toLowerCase() === seccionSeleccionada.toLowerCase()
        )
        : todosLosArticulos;

    return (
        <>
<<<<<<< Updated upstream
            <LadingPage/>
=======
            <NavBar cambiarSeccion={setSeccionSeleccionada}/>
            <div className="container">
                {productosFiltrados.map((articulo, index) => (
                <ProductoSeccion articulo={articulo}/>))}
            </div>
>>>>>>> Stashed changes
        </>
    )
}

export default App
