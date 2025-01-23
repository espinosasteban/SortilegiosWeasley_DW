import React from 'react';
import '../../styles/landingPage.css';
import ProductoSeccion from '../../components/productoSeccion';
import { articulosBromas, articulosMagiaMuggle } from '../../mocks/articulos';
import InfoBoton from '../../components/infoBoton';



export default function LandingPage() {
    return (<>
    <main>
        <Entrada/>
        <Producto/>
        <InfoBoton/>
    </main>

    </>);
}

function Entrada() {
    return (
    <>
        <section className="entrada-section">
            <h1>Sortilegios Weasley!</h1>
            <img src="../src/assets/Entrada.jpg"></img>
        </section>
    </>);
}

function Producto(){
    return (
    <>
        <section className="producto-section">
            <ProductoSeccion articulo={articulosBromas[0]}/>
            <ProductoSeccion articulo={articulosMagiaMuggle[0]}/>
        </section>
    </>
    );
}




