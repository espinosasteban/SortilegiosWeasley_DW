import React from 'react';
import '../../styles/landingPage.css';
import ProductoSeccion from '../../components/productoSeccion';
import { articulos } from '../../mocks/articulos';
import InfoBoton from '../../components/infoBoton';
import {Link} from "react-router";

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

function formatearNombreParaRuta(nombre: string): string {
    return nombre.toLowerCase().replace(/\s+/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function Producto() {
    return (
        <>
            <section className="producto-section">
                {articulos.map((articulo) => {
                    const ruta = `/producto/${formatearNombreParaRuta(articulo.nombre)}`;
                    return (
                        <Link className='link-producto' to={ruta} key={articulo.nombre}>
                            <ProductoSeccion articulo={articulo} floating={true} />
                        </Link>
                    );
                })}
            </section>


        </>
    );
}




