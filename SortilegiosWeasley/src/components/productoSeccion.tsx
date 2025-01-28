
import '../styles/ProductoSeccion.css';

import {Articulo} from "../tipos.tsx";

interface ProductoSeccionProps {
    articulo: Articulo;
    floating?: boolean;
}

function ProductoSeccion({ articulo, floating }: ProductoSeccionProps) {

    const { nombre, precio, descripcion, seccion, imagen } = articulo;
    const floatingClase = floating ? 'product floating' : 'product';

    return (
        <div className= {floatingClase} >
            <img src={imagen} alt={nombre} className="product-image" />
            <h1 className="product-title">{nombre}</h1>
            <p className="product-price">${precio}</p>
        </div>
    );
}

export default ProductoSeccion;