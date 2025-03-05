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
import { useAuth } from '../ProcesoLoginUsuario/AuthContext.tsx';

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
                    <DetalleResena setResenas={setResenas} producto={producto} />
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

function DetalleResena({setResenas, producto }: ValoracionProps) {
    const { usuario } = useAuth(); 
    return (
        <section className="detalle-resena-seccion">
            <h2 className="titulo-detalle-resena">Reseñas del producto</h2>
            <VitrinaResena producto={producto}/>
            {usuario ? (<CrearResena productoId={producto._id} setResenas={setResenas} />) : (<p>Para dejar una reseña o valorar alguna, inicia sesión.</p>)}
        </section>
    );
}

interface ValoracionProps {
    resenas: Array<ResenaArticulo> | null;
    producto: Articulo | null;
    setResenas: (resenas: Array<ResenaArticulo>) => void;
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

function VitrinaResena({producto}: ResenaProps) {
    return (
        <section className="vitrina-resena">
            <Resena producto={producto} />
        </section>
    );
}

interface ResenaProps {
    producto: Articulo | null;
}


function Resena({ producto }: ResenaProps) {
    const [usuariosResenas, setUsuariosResenas] = useState<Record<string, string>>({});
    const [resenas, setResenas] = useState<Array<ResenaArticulo>>([]);
    const [triggerUtil, setTriggerUtil] = useState(0);
    const [votosUsuario, setVotosUsuario] = useState<Record<string, string>>({});
    
    const token = localStorage.getItem('token');
    const { usuario } = useAuth();

    useEffect(() => {
        async function obtenerResenas() {
            const response = await fetch('http://localhost:5000/resenas/');
            if (!response.ok) {
                console.error('Error al obtener resenas', response.statusText);
                return;
            }
            const resenas = await response.json();
            const resenasFiltradas = resenas.filter((resena: ResenaArticulo) => resena.producto === producto._id);
            setResenas(resenasFiltradas);
        }
        obtenerResenas();
    }, [triggerUtil]);

    useEffect(() => {
        if (resenas.length > 0) {
            async function obtenerUsuariosResenas() {
                const response = await fetch('http://localhost:5000/usuario/');
                if (!response.ok) {
                    console.error('Error al obtener usuarios', response.statusText);
                    return;
                }
                const usuarios = await response.json();
                const usuariosMap = usuarios.reduce((acc: { [key: string]: string }, usuario: { _id: string, nombreUsuario: string }) => {
                    acc[usuario._id] = usuario.nombreUsuario;
                    return acc;
                }, {});
                setUsuariosResenas(usuariosMap);
            }
            obtenerUsuariosResenas();
        }
    }, [resenas]);

    function manejarVoto(idResena: string, tipo: 'recuentoUtil' | 'recuentoNoUtil') {
        if (!usuario) return;

        fetch('http://localhost:5000/votos/', {
            method: 'POST',
            body: JSON.stringify({ resenaId: idResena, tipo }),
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
        })
        .then(response => {
            if (!response.ok) {
                console.error('Error al votar', response.statusText);
                return;
            }
            setVotosUsuario((prev) => ({ ...prev, [idResena]: tipo }));
            setTriggerUtil(triggerUtil + 1);
        });
    }

    return (
        <>
            {resenas.map((resena, index) => {
                const votoUsuario = votosUsuario[resena._id];
                return (
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
                                <button 
                                    className={`btn-util ${votoUsuario === 'recuentoUtil' ? 'seleccionado' : ''}`} 
                                    onClick={() => manejarVoto(resena._id, 'recuentoUtil')} 
                                    disabled={!usuario}
                                >
                                    Útil
                                </button>
                                <p>{resena.recuentoUtil}</p>
                                <button 
                                    className={`btn-noutil ${votoUsuario === 'recuentoNoUtil' ? 'seleccionado' : ''}`} 
                                    onClick={() => manejarVoto(resena._id, 'recuentoNoUtil')} 
                                    disabled={!usuario}
                                >
                                    No útil
                                </button>
                                <p>{resena.recuentoNoUtil}</p>
                            </div>
                            <div className="calificacion">
                                <PuntuacionVarita defaultRaing={resena.puntuacion} iconSize="1.5rem" modifiable={false} />
                            </div>
                        </footer>
                    </section>
                );
            })}
        </>
    );
}



interface CrearResenaProps {
    productoId: string;
    setResenas: (resenas: Array<ResenaArticulo>) => void;
}


function CrearResena({ productoId, setResenas }: CrearResenaProps) {
    const [comentario, setComentario] = useState('');
    const [puntuacion, setPuntuacion] = useState(0);
    const token = localStorage.getItem("token");
    console.log(token);

    const guardarResena = async () => {
        if (!token) {
            console.error("No hay token disponible");
            return;
        }

        console.log(token);

        const nuevaResena: ResenaArticulo = {
            _id: '',
            puntuacion,
            fecha: new Date(),
            comentario,
            recuentoUtil: 0,
            recuentoNoUtil: 0,
            producto: productoId,
            usuario: '' // Esto será asignado en el backend
        };

        console.log('Enviando reseña:', JSON.stringify(nuevaResena));

        try {
            const respuesta = await fetch('http://localhost:5000/resenas/', {
                method: "POST",
                body: JSON.stringify(nuevaResena),
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!respuesta.ok) {
                throw new Error("Error guardando la reseña");
            }

            const resenaGuardada = await respuesta.json(); // Obtenemos la reseña creada con ID
            console.log("✅ Reseña guardada correctamente:", resenaGuardada);

            // 🔥 En lugar de volver a hacer un fetch, actualizamos directamente el estado:
            setResenas((prevResenas) => [...prevResenas, resenaGuardada]);

            // 🔄 Reseteamos el formulario después de publicar
            setComentario('');
            setPuntuacion(0);

            window.location.reload();

        } catch (error) {
            console.error("Error guardando la reseña:", error);
        }
    };

    return (
        <section className="crear-resena">
            <h2>¿Qué te pareció el producto?</h2>
            <div className='puntuacion-varita-resena'>
                <PuntuacionVarita
                    defaultRaing={puntuacion}
                    iconSize="2.5rem"
                    modifiable={true}
                    setPuntuacion={setPuntuacion}
                />
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
