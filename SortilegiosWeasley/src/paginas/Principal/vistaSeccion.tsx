import React, {useState} from 'react';
import ProductoSeccion from '../../components/ProductoSeccion';
import '../../styles/vistaSeccion.css';
import { articulos } from '../../mocks/articulos';
import InfoBoton from '../../components/infoBoton';
import {Articulo} from "../../tipos.tsx";
import PuntuacionVarita from '../ProcesoCompra/puntuacionVarita.tsx';

interface VistaSeccionProps {
    seccion: string | null;
}

export default function VistaSeccion({ seccion }: VistaSeccionProps) {
    const articulosFiltrados = seccion ? articulos.filter(articulo => articulo.seccion === seccion) : articulos;

    const [orden, setOrden] = useState<string | null>(null);

    if (orden === 'ascendente') {
        articulosFiltrados.sort((a, b) => a.precio - b.precio);
    } else if (orden === 'descendente') {
        articulosFiltrados.sort((a, b) => b.precio - a.precio);
    }

    // BORRAR: Solo para probar lo de la puntuación varita
    if (seccion === null) {
        return (
            <main className="vista-seccion">
                <PuntuacionVarita defaultRaing={0} iconSize={null} />
            </main>
        );
    }

    return (<>
        <main className="vista-seccion">
            <OrdenarPorPrecio setOrden={setOrden}/>
            <VitrinaProducto articulos={articulosFiltrados} />
            <InfoBoton />
        </main>
    </>);
}

interface OrdenarPorPrecioProps {
    setOrden: (orden: string | null) => void;
}

function OrdenarPorPrecio({setOrden}: OrdenarPorPrecioProps) {

    return (
        <>
            <section className="ordenar-precio">
                <h2>Ordenar por precio</h2>
                <button className="boton-ordenar" onClick={() => setOrden("descendente")}>Precio más alto</button>
                <button className="boton-ordenar" onClick={() => setOrden("ascendente")}>Precio más bajo</button>

            </section>
        </>
    );
}

function VitrinaProducto({articulos}: { articulos: Articulo[] }) {
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