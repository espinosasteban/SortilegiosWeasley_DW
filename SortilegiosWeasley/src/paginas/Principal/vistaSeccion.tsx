import React from 'react';
import '../../styles/landingPage.css';
import ProductoSeccion from '../../components/ProductoSeccion';
import { articulosBromas, articulosMagiaMuggle } from '../../mocks/articulos';
import InfoBoton from '../../components/infoBoton';


export default function VistaSeccion(){
    return (<>
        <main>
            <FiltroPrecio/>
            <VitrinaProducto/>
            <InfoBoton/>
        </main>

    </>);
}

function FiltroPrecio(){
    return (
    <>
        <section className="filtro-precio">
            <h1>Filtrar por precio</h1>
            <input type="number" placeholder="Precio minimo"/>
            <input type="number" placeholder="Precio maximo"/>
        </section>
    </>);
}

function VitrinaProducto(){
    return (
    <>
        <section className="vitrina-producto">
            <ProductoSeccion articulo={articulosBromas[0]}/>
            <ProductoSeccion articulo={articulosMagiaMuggle[0]}/>
        </section>
    </>
    );
}