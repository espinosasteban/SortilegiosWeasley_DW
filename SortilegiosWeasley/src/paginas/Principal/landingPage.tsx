import React from 'react';
import '../../styles/landingPage.css';
import ProductoSeccion from '../../components/productoSeccion';

import InfoBoton from '../../components/infoBoton';
import {Link} from "react-router";
import { Articulo } from '../../tipos';


interface LandingPageProps {
    setSeccion: (seccion: string | null) => void;
    setProducto: (producto: Articulo | null) => void;
    productos: Array<Articulo>;
}

export default function LandingPage({setSeccion, setProducto, productos}: LandingPageProps) {
    if (productos.length === 0) {
        return <p>🔄 Cargando productos...</p>;
    }

    return (<>
    <main>
        <section className="entrada-section">
            <h1>¡Bienvenidos a Sortilegios Weasley!</h1>
            <img src="../src/assets/Entrada.jpg"></img>
        </section>
        <Producto setProducto={setProducto} productos={productos}/>
        <CarruselProductos setSeccion={setSeccion} productos={productos}/>
        <InfoBoton/>
    </main>

    </>);
}


function formatearNombreParaRuta(nombre: string): string {
    return nombre.toLowerCase().replace(/\s+/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function Producto({productos, setProducto}: {productos: Array<Articulo>, setProducto: (producto: Articulo | null) => void}) {
     /*
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
    */
    return (
        <>
            <section className="producto-section">
                {productos.slice(0,5).map((producto) => {
                    const ruta = `/producto/${formatearNombreParaRuta(producto.nombre)}`;
                    return (
                        <Link className='link-producto' onClick={()=>setProducto(producto)} to={ruta} key={producto.nombre}>
                            <ProductoSeccion articulo={producto} floating={true} />
                        </Link>
                    );
                })}
            </section>
        </>
    );
}


interface CarruselProductosProps {
    setSeccion: (seccion: string | null) => void;
    productos: Array<Articulo>;
}

function CarruselProductos({setSeccion, productos}: CarruselProductosProps) {
    return (
        <>
        <section className="carrusel-contenedor">
            <h2 className ="titulo-descubre-mas">Descubre más...</h2>

            <div className="carrusel-productos">

                <Link to="/vistaSeccion" onClick={() => setSeccion('Bromas')}>
                    <div className="producto-carrusel">
                        <img src={productos.filter(producto => producto.seccion === "67bb546c4b598574467ef6b1")[0].img} alt="Sombrero Antigravedad" />
                        <h2>
                            Bromas
                        </h2>
                    </div>
                </Link>

                <Link to="/vistaSeccion" onClick={() => setSeccion('Magia Muggle')}>
                    <div className="producto-carrusel">
                        <img src={productos.filter(producto => producto.seccion === "67bb587da5bd9da775c01231")[0].img} alt="Los Ratones Magicos De Maria" />
                        <h2>
                            Magia Muggle
                        </h2>
                    </div>
                </Link>

                <Link to="/vistaSeccion" onClick={() => setSeccion('Explosivos')}>
                <div className="producto-carrusel">
                    <img src={productos.filter(producto => producto.seccion === "67c7001bbba0ae4cf9013b48")[0].img} alt="Wildfire Whizz-Bangs" />
                    <h2>
                        Explosivos
                    </h2>
                </div>
                </Link>

            </div>
            
            
        </section>
        
        
        
        
        </>);
        
    }