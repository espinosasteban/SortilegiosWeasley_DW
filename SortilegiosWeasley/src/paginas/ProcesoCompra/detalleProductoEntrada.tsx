import {Articulo, ResenaArticulo} from "../../tipos.tsx";
import '../../styles/detalleProductoEntrada.css';




/*


export default function VistaProducto(){
    <main>
        <DetalleProducto/>
        <DetalleResena/>
    </main>

}
*/


function DetalleProducto(){
    <section>
        <MostradorProducto/>
        <Detalle/>
    </section>



}

function MostradorProducto(){
    return (
        <>
        </>
    );

}

/*
aqui va el componente PuntuacionVarita
 */


interface DetalleProps {
    producto: Articulo | null;
}

export default function Detalle({ producto }: DetalleProps) {
    return (
        <>
            <section className="detalle-seccion">
                <h2>{producto?.nombre ?? 'Nombre no disponible'}</h2>
                <p>{producto?.descripcion ?? 'Descripción no disponible'}</p>
                <p>{producto?.precio ?? 'Precio no disponible'}</p>
                <button>Añadir al carrito</button>
            </section>
            <DetalleResena producto={producto}/>
        </>
    );
}


function DetalleResena({producto}: ValoracionProps) {
    return (
        <>
            <section className="detalle-resena-seccion">
                <h2 className="titulo-detalle-resena">Reseñas del producto</h2>
                <Valoracion producto={producto}/>

                <VitrinaResena resenas={producto?.resenas ?? null}/>
            </section>

        </>
    );

}

interface ValoracionProps {
    producto: Articulo | null;
}

function Valoracion({ producto }: ValoracionProps) {
    return (
        <section className="valoracion-seccion">
            <h2>
                {!(producto) || producto.resenas.length === 0
                    ? "Sin calificaciones"
                    : (producto.resenas.reduce((sum, resena) => sum + resena.calificacion, 0) / producto.resenas.length).toFixed(1)}
            </h2>
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