import {Articulo, ResenaArticulo} from "../../tipos.tsx";
import '../../styles/detalleProductoEntrada.css';

import PuntuacionVarita from "./puntuacionVarita.tsx";
import { useParams } from "react-router";
import { articulos } from "../../mocks/articulos.tsx";








export default function VistaProducto(){

    const { nombreProducto } = useParams<{ nombreProducto: string }>();
    const producto = articulos.find(art => formatearNombreParaRuta(art.nombre) === nombreProducto) || null;

    return <>
        <main className="main-vista-producto">
            <DetalleProducto producto={producto}/>
            <DetalleResena producto={producto}/>
        </main>

    </>
}

function formatearNombreParaRuta(nombre: string): string {
    return nombre.toLowerCase().replace(/\s+/g, '');
}


interface DetalleProductoProps {
    producto: Articulo | null;
}

function DetalleProducto({producto}: DetalleProductoProps){
        return <>
            <section className="detalle-producto-seccion">
                <MostradorProducto producto={producto}/>
                <Detalle producto={producto}/>
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
                <img src={producto?.imagen ?? 'Imagen no disponible'} alt={producto?.nombre ?? 'Nombre no disponible'}/>
                <Valoracion producto={producto}/>
            </section>
        </>
    );

}

/*
aqui va el componente PuntuacionVarita
 */


interface DetalleProps {
    producto: Articulo | null;
}

function Detalle({ producto }: DetalleProps) {
    return (
        <>
            <section className="detalle-seccion">
                <h2>{producto?.nombre ?? 'Nombre no disponible'}</h2>
                <p>{producto?.descripcion ?? 'Descripción no disponible'}</p>
                <p>{producto?.precio ?? 'Precio no disponible'}</p>
                <button>Añadir al carrito</button>
            </section>
        </>
    );
}


function DetalleResena({producto}: ValoracionProps) {
    return (
        <>
            <section className="detalle-resena-seccion">
                <h2 className="titulo-detalle-resena">Reseñas del producto</h2>
                <PuntuacionVarita defaultRaing={0} iconSize="3rem" modifiable={true}/>
                <VitrinaResena resenas={producto?.resenas ?? null}/>
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
                            <p>Calificación: {resena.calificacion}/5</p>
                        </div>
                    </footer>
                </section>
            ))}
        </>
    );
}
