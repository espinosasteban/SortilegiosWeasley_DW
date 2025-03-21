
import '../styles/ProductoSeccion.css';

import {Articulo} from "../tipos.tsx";

interface ProductoSeccionProps {
    articulo: Articulo;
    floating?: boolean;
}

function ProductoSeccion({ articulo, floating }: ProductoSeccionProps) {

    const { nombre, precio, img } = articulo;
    const floatingClase = floating ? 'product floating' : 'product';

    return (
        <div className= {floatingClase} >
            <div className="contenedor-imagen">
                <img src={img} alt={nombre} className="product-image"/>
            </div>

            <h1 className="product-title">{nombre}</h1>
            <p className="product-price">{precio}</p>
        </div>
    );
}

export default ProductoSeccion;