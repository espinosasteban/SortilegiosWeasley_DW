import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductoSeccion from '../components/productoSeccion.tsx'
import {articulosBromas, articulosMagiaMuggle} from "../mocks/articulos.tsx";

function App() {
    const [count, setCount] = useState(0)


    return (
        <>
            <div className="container">
                <ProductoSeccion articulo={articulosBromas[0]}/>
                <ProductoSeccion articulo={articulosMagiaMuggle[0]}/>
            </div>
        </>
    )
}

export default App
