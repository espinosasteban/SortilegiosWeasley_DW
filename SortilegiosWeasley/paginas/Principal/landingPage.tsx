import React from 'react';
import '../../styles/productoSeccion.css';
import ProductoSeccion from '../../components/productoSeccion';
import { articulosBromas, articulosMagiaMuggle } from '../../mocks/articulos';
import InfoBoton from '../../components/infoBoton';



export default function LandingPage() {
    return (<> 
        <Entrada/>
        <Producto/>
        <InfoBoton/>
    </>);
}

function Entrada() {
    return (
    <>
        <section>
            <h1>Sortilegios Weasley!</h1>
            <img src="../src/assets/Entrada.jpg"></img>
        </section>
    </>);
}

function Producto(){
    return (
    <>
        <div className="container">
            <ProductoSeccion articulo={articulosBromas[0]}/>
            <ProductoSeccion articulo={articulosMagiaMuggle[0]}/>
        </div>
    </>
    );
}




