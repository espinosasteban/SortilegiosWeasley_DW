import {useState} from 'react'

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
            <NavBar cambiarSeccion={setSeccionSeleccionada}/>
            <LadingPage/>

        </>
    )
}

export default App
