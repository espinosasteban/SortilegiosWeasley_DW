import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductoSeccion from '../components/productoSeccion.tsx'
import {articulosBromas, articulosMagiaMuggle} from "../mocks/articulos.tsx";

import LadingPage from '../paginas/Principal/landingPage.tsx'
function App() {
    const [count, setCount] = useState(0)


    return (
        <>
            <LadingPage/>
        </>
    )
}

export default App
