import '../../styles/detalleProductoEntrada.css';

// Tipos
import { articulos } from "../../mocks/articulos.tsx";
import {Articulo, ResenaArticulo, ArticuloCarrito} from "../../tipos.tsx";


import PuntuacionVarita from "./puntuacionVarita.tsx";
import { useParams } from "react-router";

// Contexts
import { CartContext } from '../../contexts/CartContext.tsx';

// Hooks
import { useContext, useEffect } from 'react';

export default function VistaProducto(){

    const { nombreProducto } = useParams<{ nombreProducto: string }>();
    const producto = articulos.find(art => formatearNombreParaRuta(art.nombre) === nombreProducto) || null;

    return <>
        <main className="main-vista-producto">
        {producto && (
          <>
          <DetalleProducto producto={producto} />
          <DetalleResena producto={producto} />
          </>
        )}
        {!producto && <p>No hay producto seleccionado.</p>}
        </main>

    </>
}

function formatearNombreParaRuta(nombre: string): string {
    return nombre.toLowerCase().replace(/\s+/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}


interface DetalleProductoProps {
    producto: Articulo;
}

function DetalleProducto({producto }: DetalleProductoProps){

    useEffect(() => {
        window.scrollTo(0, 0); // Desplaza la página al inicio
    }, []);
        return <>

            <section className="detalle-producto-seccion">
                <MostradorProducto producto={producto}/>
                <Detalle producto={producto} />
            </section>
        </>


}

interface MostradorProductoProps {
    producto: Articulo | null;
}

function MostradorProducto({producto}: MostradorProductoProps){
    return (
        <>
            <section className="mostrador-producto-seccion">

                <img src={producto?.imagen ?? 'Imagen no disponible'}
                     id={producto?.nombre.toLowerCase().replace(/\s+/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')}
                     alt={producto?.nombre ?? 'Nombre no disponible'}/>
                <Valoracion producto={producto}/>
            </section>
        </>
    );

}

interface DetalleProps {
    producto: ArticuloCarrito;
}

function Detalle({ producto}: DetalleProps) {
    const { addToCart} = useContext(CartContext)
    return (
        <>
            <section className="detalle-seccion">
                <h2>{producto?.nombre ?? 'Nombre no disponible'}</h2>
                <p className="detalle-seccion-descripcion">{producto?.descripcion ?? 'Descripción no disponible'}</p>

                <div className="contenedor-detalle-seccion">
                    <p className="detalle-seccion-precio">${producto?.precio ?? 'Precio no disponible'}</p>
                    <button onClick={() => addToCart(producto)}>Añadir al carrito</button>
                </div>
            </section>
        </>
    );
}


function DetalleResena({producto}: ValoracionProps) {
    return (
        <>
            <section className="detalle-resena-seccion">
                <h2 className="titulo-detalle-resena">Reseñas del producto</h2>
                <VitrinaResena resenas={producto?.resenas ?? null}/>
                <CrearResena/>
            </section>

        </>
    );
}

interface ValoracionProps {
    producto: Articulo | null;
}

function Valoracion({ producto }: ValoracionProps) {

    let puntuacion = '0';

    if (producto) {
        puntuacion = (producto.resenas.reduce((sum, resena) => sum + resena.calificacion, 0) / producto.resenas.length).toFixed(1)
    }

    return (
        <section className="valoracion-seccion">
            <h2>
                {!(producto) || producto.resenas.length === 0
                    ? "Sin calificaciones"
                    : puntuacion}
            </h2>
            <PuntuacionVarita defaultRaing={Math.floor(Number(puntuacion))} iconSize="2rem" modifiable={false}/>
        </section>
    );
}

function VitrinaResena({resenas}: ResenaProps){
    return (
        <>
            <section className="vitrina-resena">
                <Resena resenas={resenas}/>
            </section>

        </>
    );

}

interface ResenaProps {
    resenas: Array<ResenaArticulo> | null;
}

function Resena({ resenas }: ResenaProps) {
    return (
        <>
            {resenas?.map((resena, index) => (
                <section className="resena" key={index}>
                    <header>
                        <h3>{resena.nombreUsuario}</h3>
                        <p>{resena.fechaComentario}</p>
                    </header>
                    <div className="contenido">
                        <p>{resena.comentario}</p>
                    </div>
                    <footer>
                        <div className="utilidad">
                            <button>Útil</button>
                            <p>{resena.cantidadEsUtil}</p>
                            <button>No útil</button>
                            <p>{resena.cantidadNoEsUtil}</p>
                        </div>
                        <div className="calificacion">
                            <PuntuacionVarita defaultRaing={resena.calificacion} iconSize="1.5rem" modifiable={false}/>
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