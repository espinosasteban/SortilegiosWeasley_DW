import React from 'react';
import '../styles/productoSeccion.css';
import {Articulo} from "../tipos.tsx";

interface ProductoSeccionProps {
    articulo: Articulo;
}

function ProductoSeccion({ articulo }: ProductoSeccionProps) {

    const { nombre, precio, descripcion, seccion, imagen } = articulo;

    return (
        <div className="product">
            <img src={imagen} alt={nombre} className="product-image" />
            <h1 className="product-title">{nombre}</h1>
            <p className="product-price">${precio}</p>
        </div>
    );
}

export default ProductoSeccion;