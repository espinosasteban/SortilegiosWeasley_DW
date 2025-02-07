import React, {useState} from 'react';
import ProductoSeccion from '../../components/ProductoSeccion';
import '../../styles/vistaSeccion.css';
import { articulos } from '../../mocks/articulos';
import InfoBoton from '../../components/infoBoton';
import {Articulo} from "../../tipos.tsx";
import {Link} from "react-router";


interface VistaSeccionProps {
    seccion: string | null;
    setProducto: (producto: Articulo | null) => void;
}

export default function VistaSeccion({ seccion, setProducto }: VistaSeccionProps) {
    const articulosFiltrados = seccion ? articulos.filter(articulo => articulo.seccion === seccion) : articulos;
    const [orden, setOrden] = useState<string | null>(null);

    if (orden === 'ascendente') {
        articulosFiltrados.sort((a, b) => a.precio - b.precio);
    } else if (orden === 'descendente') {
        articulosFiltrados.sort((a, b) => b.precio - a.precio);
    }



    return (<>
        <main className="vista-seccion">
            <OrdenarPorPrecio setOrden={setOrden}/>
            <VitrinaProducto articulos={articulosFiltrados} setProducto={setProducto}/>
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

function formatearNombreParaRuta(nombre: string): string {
    return nombre.toLowerCase().replace(/\s+/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Elimina espacios y convierte a minúsculas
}

interface VitrinaProductoProps {
    articulos: Articulo[];
    setProducto: (producto: Articulo | null) => void;
}

function VitrinaProducto({ articulos, setProducto}: VitrinaProductoProps) {
    return (
        <section className="vitrina-producto">
            {articulos.map((articulo) => {
                const ruta = `/producto/${formatearNombreParaRuta(articulo.nombre)}`;
                return (
                    <Link className='link-producto' to={ruta} key={articulo.nombre} onClick={() => setProducto(articulo)}>
                        <ProductoSeccion articulo={articulo} floating={false} />
                    </Link>
                );
            })}
        </section>
    );
}



