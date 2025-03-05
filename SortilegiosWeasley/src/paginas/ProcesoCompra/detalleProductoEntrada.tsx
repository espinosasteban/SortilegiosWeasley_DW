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
import {useAuth} from "../ProcesoLoginUsuario/AuthContext.tsx";

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
                    <DetalleResena resenas={resenas} setResenas={setResenas} productoId={producto._id} />
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
            <Valoracion resenas={resenas}/>
        </section>
    );
}

interface DetalleProps {
    producto: ArticuloCarrito;
}

function Detalle({ producto }: DetalleProps) {
    const { addToCart } = useContext(CartContext);
    const [cantidad, setCantidad] = useState(1);
    const [stockDisponible, setStockDisponible] = useState(0);

    // No muestra los errores, tengo que buscar la función para hacerlo
    const [mensajeError, setMensajeError] = useState("");

    useEffect(() => {
        async function fetchStock() {
            try {
                const response = await fetch(`http://localhost:5000/producto/${producto._id}`);
                const data = await response.json();
                setStockDisponible(data.unidadesStock);
            } catch (error) {
                console.error("Error obteniendo el stock:", error);
            }
        }
        fetchStock();
    }, [cantidad]);

    const incrementar = () => {
        if (cantidad < stockDisponible) {
            setCantidad(prev => prev + 1);
            setMensajeError("");
        } else {
            setMensajeError(`Solo hay ${stockDisponible} unidades disponibles.`);
        }
    };

    const decrementar = () => {
        if (cantidad > 1) {
            setCantidad(prev => prev - 1);
            setMensajeError("");
        }
    };

    return (
        <section className="detalle-seccion">
            <h2>{producto?.nombre ?? 'Nombre no disponible'}</h2>
            <p className="detalle-seccion-descripcion">{producto?.descripcion ?? 'Descripción no disponible'}</p>
            <div className="contenedor-detalle-seccion">
                <p className="detalle-seccion-precio">${producto?.precio ?? 'Precio no disponible'}</p>

                <div className="cantidad-controles">
                    <button onClick={decrementar} disabled={cantidad === 1}>-</button>
                    <span>{cantidad}</span>
                    <button onClick={incrementar} disabled={cantidad >= stockDisponible}>+</button>
                </div>

                {mensajeError && <p className="mensaje-error">{mensajeError}</p>}

                {/*Aquí supongo que deberíamos pasar también la cantidad*/}
                <button
                    onClick={() => addToCart(producto)}
                    disabled={stockDisponible === 0}
                >
                    {stockDisponible === 0 ? "Sin stock" : "Añadir al carrito"}
                </button>
            </div>
        </section>
    );
}


function DetalleResena({ resenas, setResenas, productoId}: ValoracionProps) {
    const { usuario } = useAuth();

    return (
        <section className="detalle-resena-seccion">
            <h2 className="titulo-detalle-resena">Reseñas del producto</h2>
            <VitrinaResena resenas={resenas} />
            {usuario ? (<CrearResena setResenas={setResenas} productoId={productoId} />) :
            (<p className="aviso-inicio-sesion">Para dejar una resena, inicia sesión</p>)}
        </section>
    );
}

interface ValoracionProps {
    resenas: Array<ResenaArticulo> | null;
}

function Valoracion({ resenas }: ValoracionProps) {
    let puntuacion = '0';

    if (resenas && resenas.length > 0) {
        const promedio = resenas.reduce((sum, resena) => sum + resena.puntuacion, 0) / resenas.length;
        puntuacion = (Math.round(promedio * 10) / 10).toFixed(1); // Redondea a un decimal
    }

    return (
        <section className="valoracion-seccion">
            <h2>
                {!resenas || resenas.length === 0
                    ? "Sin calificaciones"
                    : puntuacion}
            </h2>
            {resenas && resenas.length > 0 && (
                <PuntuacionVarita
                    defaultRaing={Math.round(Number(puntuacion))}
                    iconSize="2rem"
                    modifiable={false}
                />
            )}
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
                        <p>{new Date(resena.fecha).toLocaleDateString('es-ES')}</p>
                    </header>
                    <div className="contenido">
                        <p className="resena-comentario">{resena.comentario}</p>
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
interface CrearResenaProps {
    setResenas: (resenas: Array<ResenaArticulo>) => void;
    productoId: string;
}


function CrearResena({ setResenas, productoId }: CrearResenaProps) {
    const token = localStorage.getItem("token");
    const [comentario, setComentario] = useState('');
    const [puntuacion, setPuntuacion] = useState(0);

    const guardarResena = async () => {
        const resena: ResenaArticulo = {
            puntuacion: puntuacion,
            fecha: new Date(),
            comentario: comentario,
            recuentoUtil: 0,
            recuentoNoUtil: 0,
            producto: productoId,
            usuario: ''
        };
        console.log('Token:', token);
        console.log(resena);
        console.log(JSON.stringify(resena));

        const respuesta = await fetch('http://localhost:5000/resenas/', {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(resena),
        });

        if (!respuesta.ok) {
            console.error("Error guardando la reseña");
            return;
        }

        // Después de guardar, recargar toda la lista desde la API
        fetch('http://localhost:5000/resenas/', {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => setResenas(data.filter((resena: ResenaArticulo) => resena.producto === productoId)))
            .catch((error) => console.error("Error obteniendo reseñas:", error));
    };

    return (

        <section className="crear-resena">
            <h2>¿Qué te pareció el producto?</h2>
            <div className='puntuacion-varita-resena'>
                <PuntuacionVarita defaultRaing={0} iconSize="2.5rem" modifiable={true} setPuntuacion={setPuntuacion} />
            </div>


            <textarea
                className='contenido-resena'
                placeholder="Escribe tu reseña aquí..."
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
            />
            <button className="boton-publicar" onClick={guardarResena}>Publicar</button>
        </section>
    );
}