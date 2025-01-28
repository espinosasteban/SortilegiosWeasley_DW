import React from 'react';
import ProductoSeccion from '../../components/ProductoSeccion';
import '../../styles/vistaSeccion.css';
import { articulos } from '../../mocks/articulos';
import InfoBoton from '../../components/infoBoton';
import {Articulo} from "../../tipos.tsx";

interface VistaSeccionProps {
    seccion: string | null;
}

export default function VistaSeccion({ seccion }: VistaSeccionProps) {
    const articulosFiltrados = seccion ? articulos.filter(articulo => articulo.seccion === seccion) : articulos;

    return (<>
        <main className="vista-seccion">
            <OrdenarPorPrecio />
            <VitrinaProducto articulos={articulosFiltrados} />
            <InfoBoton />
        </main>
    </>);
}

function OrdenarPorPrecio() {
    return (
        <>
            <section className="ordenar-precio">
                <h2 className="elemento-ordenar">Ordenar por precio</h2>
                <button className="elemento-ordenar">Precio más alto</button>
                <button className="elemento-ordenar">Precio más bajo</button>

            </section>
        </>
    );
}

function VitrinaProducto({ articulos }: { articulos: Articulo[] }) {
    return (
        <>
            <section className="vitrina-producto">
                {articulos.map((articulo) => (
                    <ProductoSeccion articulo={articulo} floating = {false}  />
                ))}
            </section>
        </>
    );
}