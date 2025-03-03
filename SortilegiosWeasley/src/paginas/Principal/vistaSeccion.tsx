import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import ProductoSeccion from '../../components/productoSeccion';
import '../../styles/vistaSeccion.css';
import InfoBoton from '../../components/infoBoton';
import { Articulo, Seccion } from "../../tipos.tsx";
import { Link } from "react-router";

interface VistaSeccionProps {
    nombreSeccion: string | null;
    setProducto: (producto: Articulo | null) => void;
    productos: Array<Articulo>;
}

export default function VistaSeccion({ nombreSeccion, setProducto, productos }: VistaSeccionProps) {
    const location = useLocation();
    const searchTerm = location.state?.searchTerm || '';
    const [orden, setOrden] = useState<string | null>(null);
    const [seccion, setSeccion] = useState<Seccion | null>(null);

    const fetchSeccionByName = async (nombreSeccion: string | null) => {
        try {
            if (nombreSeccion === null) {
                console.log("La sección que se ha pasado es null");
                return null;
            }

            const response = await fetch(`http://localhost:5000/seccion/nombre/${nombreSeccion}`);
            if (!response.ok) {
                console.log("Error al obtener la sección", response.statusText);
                return "";
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    };

    useEffect(() => {
        const obtenerSeccion = async () => {
            const seccionData = await fetchSeccionByName(nombreSeccion);
            setSeccion(seccionData);
        };
        obtenerSeccion();
    }, [nombreSeccion]);

    if (seccion == null) {
        return <><p>La sección es nula</p></>;
    }
    console.log(seccion)

    let productosFiltrados = productos.filter(producto => producto.seccion === seccion._id);


    if (searchTerm) {
        productosFiltrados = productosFiltrados.filter(producto =>
            producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    if (orden === 'ascendente') {
        productosFiltrados.sort((a, b) => a.precio - b.precio);
    } else if (orden === 'descendente') {
        productosFiltrados.sort((a, b) => b.precio - a.precio);
    }

    return (
        <main className="vista-seccion">
            <OrdenarPorPrecio setOrden={setOrden} />
            {productosFiltrados.length > 0 ? (
                <VitrinaProducto articulos={productosFiltrados} setProducto={setProducto} />
            ) : (
                <NoProductosEncontrados />
            )}
            <InfoBoton />
        </main>
    );
}

interface OrdenarPorPrecioProps {
    setOrden: (orden: string | null) => void;
}

function OrdenarPorPrecio({ setOrden }: OrdenarPorPrecioProps) {
    return (
        <section className="ordenar-precio">
            <h2>Ordenar por precio</h2>
            <button className="boton-ordenar" onClick={() => setOrden("descendente")}>Precio más alto</button>
            <button className="boton-ordenar" onClick={() => setOrden("ascendente")}>Precio más bajo</button>
        </section>
    );
}

function formatearNombreParaRuta(nombre: string): string {
    return nombre.toLowerCase().replace(/\s+/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

interface VitrinaProductoProps {
    articulos: Articulo[];
    setProducto: (producto: Articulo | null) => void;
}

function VitrinaProducto({ articulos, setProducto }: VitrinaProductoProps) {
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

function NoProductosEncontrados() {
    return (
        <section className="no-productos-encontrados">
            <h2>No se encontraron productos :( </h2>
        </section>
    );
}