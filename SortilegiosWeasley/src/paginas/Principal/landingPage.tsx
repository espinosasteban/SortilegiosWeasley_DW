import React from 'react';
import '../../styles/landingPage.css';
import ProductoSeccion from '../../components/productoSeccion';
import { articulos } from '../../mocks/articulos';
import InfoBoton from '../../components/infoBoton';
import {Link} from "react-router";


interface LandingPageProps {
    setSeccion: (seccion: string | null) => void;
}
export default function LandingPage({setSeccion}: LandingPageProps) {
    return (<>
    <main>
        <section className="entrada-section">
            <h1>¡Bienvenidos a Sortilegios Weasley!</h1>
            <img src="../src/assets/Entrada.jpg"></img>
        </section>
        <Producto/>
        <CarruselProductos setSeccion={setSeccion}/>
        <InfoBoton/>
    </main>

    </>);
}


function formatearNombreParaRuta(nombre: string): string {
    return nombre.toLowerCase().replace(/\s+/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function Producto() {

    articulos.sort((a, b) => {
        
        const diferenciaResenas = b.resenas.length - a.resenas.length;
    
        if (diferenciaResenas !== 0) {
        return diferenciaResenas;
        }
    
        const promedioA = a.resenas.length
        ? a.resenas.reduce((sum, resena) => sum + resena.calificacion, 0) / a.resenas.length
        : 0;
    
        const promedioB = b.resenas.length
        ? b.resenas.reduce((sum, resena) => sum + resena.calificacion, 0) / b.resenas.length
        : 0;
    
        return promedioB - promedioA;
    });

    return (
        <>
            <section className="producto-section">
                {articulos.slice(0,5).map((articulo) => {
                    const ruta = `/producto/${formatearNombreParaRuta(articulo.nombre)}`;
                    return (
                        <Link className='link-producto' to={ruta} key={articulo.nombre}>
                            <ProductoSeccion articulo={articulo} floating={true} />
                        </Link>
                    );
                })}
            </section>


        </>
    );
}


interface CarruselProductosProps {
    setSeccion: (seccion: string | null) => void;
}

function CarruselProductos({setSeccion}: CarruselProductosProps) {
    return (
        <>
        <section className="carrusel-contenedor">
            <h2 className ="titulo-descubre-mas">Descubre más...</h2>

            <div className="carrusel-productos">

                <Link to="/vistaSeccion" onClick={() => setSeccion('Bromas')}>
                    <div className="producto-carrusel">
                        <img src={articulos.filter(articulo => articulo.seccion === "Bromas")[0].imagen} alt="Sombrero Antigravedad" />
                        <h2>
                            Bromas
                        </h2>
                    </div>
                </Link>

                <Link to="/vistaSeccion" onClick={() => setSeccion('Magia Muggle')}>
                    <div className="producto-carrusel">
                        <img src={articulos.filter(articulo => articulo.seccion === "Magia Muggle")[1].imagen} alt="Los Ratones Magicos De Maria" />
                        <h2>
                            Magia Muggle
                        </h2>
                    </div>
                </Link>




                <Link to="/vistaSeccion" onClick={() => setSeccion('Explosivos')}>


                <div className="producto-carrusel">
                    <img src={articulos.filter(articulo => articulo.seccion === "Explosivos")[0].imagen} alt="Wildfire Whizz-Bangs" />
                    <h2>
                        Explosivos
                    </h2>
                </div>
                </Link>

            </div>
            
            
        </section>
        
        
        
        
        </>);
        
    }




