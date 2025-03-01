import '../../styles/detalleProductoEntrada.css';

// Tipos
import { articulos } from "../../mocks/articulos.tsx";
import { Articulo, ResenaArticulo, ArticuloCarrito } from "../../tipos.tsx";

import PuntuacionVarita from "./puntuacionVarita.tsx";
import { useParams } from "react-router";

// Contexts
import { CartContext } from '../../contexts/CartContext.tsx';

// Hooks
import { useContext, useEffect, useState } from 'react';

interface VistaProductoProps {
    productos: Articulo[];
    setProducto: (producto: Articulo | null) => void;
}

export default function VistaProducto({ productos, setProducto }: VistaProductoProps) {
    const { nombreProducto } = useParams<{ nombreProducto: string }>();
    const [resenas, setResenas] = useState<Array<ResenaArticulo>>([]);
    const [producto, setProductoState] = useState<Articulo | null>(null);

    useEffect(() => {
        if (nombreProducto) {
            const productoEncontrado = productos.find(p => formatearNombreParaRuta(p.nombre) === nombreProducto);
            if (productoEncontrado) {
                setProducto(productoEncontrado);
                setProductoState(productoEncontrado);
            }
        }
    }, [nombreProducto, productos, setProducto]);

    useEffect(() => {
        if (producto) {
            console.log('Entré al useEffect de resenas');
            console.log(producto);
            async function obtenerResenas() {
                const response = await fetch('http://localhost:5000/resenas/');
                console.log(response);
                if (!response.ok) {
                    console.log('Error al obtener resenas', response.statusText);
                    return;
                }
                const resenas = await response.json();
                const resenasFiltradas = resenas.filter((resena: ResenaArticulo) => resena.producto === producto._id);
                console.log(resenasFiltradas);
                setResenas(resenasFiltradas);
            }
            obtenerResenas();
        }
    }, [producto]);

    return (
        <main className="main-vista-producto">
            {producto ? (
                <>
                    <DetalleProducto producto={producto} resenas={resenas} />
                    <DetalleResena resenas={resenas} />
                </>
            ) : (
                <p>No hay producto seleccionado.</p>
            )}
        </main>
    );
}

function formatearNombreParaRuta(nombre: string): string {
    return nombre.toLowerCase().replace(/\s+/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

interface DetalleProductoProps {
    producto: Articulo;
    resenas: Array<ResenaArticulo> | null;
}

function DetalleProducto({ producto, resenas }: DetalleProductoProps) {
    useEffect(() => {
        window.scrollTo(0, 0); // Desplaza la página al inicio
    }, []);

    return (
        <section className="detalle-producto-seccion">
            <MostradorProducto producto={producto} resenas={resenas} />
            <Detalle producto={producto} />
        </section>
    );
}

interface MostradorProductoProps {
    producto: Articulo | null;
    resenas: Array<ResenaArticulo> | null;
}

function MostradorProducto({ producto, resenas }: MostradorProductoProps) {
    return (
        <section className="mostrador-producto-seccion">
            <img
                src={producto?.img ?? 'Imagen no disponible'}
                id={producto?.nombre.toLowerCase().replace(/\s+/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')}
                alt={producto?.nombre ?? 'Nombre no disponible'}
            />
            <Valoracion producto={producto} resenas={resenas} />
        </section>
    );
}

interface DetalleProps {
    producto: ArticuloCarrito;
}

function Detalle({ producto }: DetalleProps) {
    const { addToCart } = useContext(CartContext);
    return (
        <section className="detalle-seccion">
            <h2>{producto?.nombre ?? 'Nombre no disponible'}</h2>
            <p className="detalle-seccion-descripcion">{producto?.descripcion ?? 'Descripción no disponible'}</p>
            <div className="contenedor-detalle-seccion">
                <p className="detalle-seccion-precio">${producto?.precio ?? 'Precio no disponible'}</p>
                <button onClick={() => addToCart(producto)}>Añadir al carrito</button>
            </div>
        </section>
    );
}

function DetalleResena({ resenas }: ValoracionProps) {
    return (
        <section className="detalle-resena-seccion">
            <h2 className="titulo-detalle-resena">Reseñas del producto</h2>
            <VitrinaResena resenas={resenas} />
            <CrearResena />
        </section>
    );
}

interface ValoracionProps {
    resenas: Array<ResenaArticulo> | null;
}

function Valoracion({ resenas }: ValoracionProps) {
    let puntuacion = '0';

    if (resenas) {
        puntuacion = (resenas.reduce((sum, resena) => sum + resena.puntuacion, 0) / resenas.length).toFixed(1);
    }

    return (
        <section className="valoracion-seccion">
            <h2>
                {!(resenas) || resenas.length === 0
                    ? "Sin calificaciones"
                    : puntuacion}
            </h2>
            <PuntuacionVarita defaultRaing={Math.floor(Number(puntuacion))} iconSize="2rem" modifiable={false} />
        </section>
    );
}

function VitrinaResena({ resenas }: ResenaProps) {
    return (
        <section className="vitrina-resena">
            <Resena resenas={resenas} />
        </section>
    );
}

interface ResenaProps {
    resenas: Array<ResenaArticulo> | null;
}

function Resena({ resenas }: ResenaProps) {
    const [usuariosResenas, setUsuariosResenas] = useState<Record<string, string>>({});

    useEffect(() => {
        if (resenas && resenas.length > 0) {
            console.log('Entré al useEffect de usuariosResenas');
            async function obtenerUsuariosResenas() {
                const response = await fetch('http://localhost:5000/usuario/');
                console.log(response);
                if (!response.ok) {
                    console.log('Error al obtener usuarios', response.statusText);
                    return;
                }
                const usuarios = await response.json();
                const usuariosMap = usuarios.reduce((acc: { [key: string]: string }, usuario: { _id: string, nombreUsuario: string }) => {
                    acc[usuario._id] = usuario.nombreUsuario;
                    return acc;
                }, {});
                console.log(usuariosMap);
                setUsuariosResenas(usuariosMap);
            }
            obtenerUsuariosResenas();
        }
    }, [resenas]);

    return (
        <>
            {resenas?.map((resena, index) => (
                <section className="resena" key={index}>
                    <header>
                        <h3>{usuariosResenas[resena.usuario]}</h3>
                        <p>{resena.fecha}</p>
                    </header>
                    <div className="contenido">
                        <p>{resena.comentario}</p>
                    </div>
                    <footer>
                        <div className="utilidad">
                            <button>Útil</button>
                            <p>{resena.recuentoUtil}</p>
                            <button>No útil</button>
                            <p>{resena.recuentoNoUtil}</p>
                        </div>
                        <div className="calificacion">
                            <PuntuacionVarita defaultRaing={resena.puntuacion} iconSize="1.5rem" modifiable={false} />
                        </div>
                    </footer>
                </section>
            ))}
        </>
    );
}

function CrearResena() {
    return (
        <section className="crear-resena">
            <h2>¿Qué te pareció el producto?</h2>
            <div className='puntuacion-varita-resena'>
                <PuntuacionVarita defaultRaing={0} iconSize="2.5rem" modifiable={true} />
            </div>
            <textarea className='contenido-resena' placeholder="Escribe tu reseña aquí..." />
            <button className="boton-publicar">Publicar</button>
        </section>
    );
}