export interface Articulo {

    nombre: string, 
    descripcion: string,
    img: string,
    precio: Number,
    unidadesStock: Number,
    seccion: string
}

export interface ArticuloCarrito extends Articulo {
    total_items: number;
}

export interface ResenaArticulo {
    puntuacion: number;
    fecha: Date;
    comentario: string;
    recuentoUtil: number;
    recuentoNoUtil: number;
    producto: string; /*esto sería el id */
    usuario: string; /*esto sería el id */

}

export interface Direccion {
    id: number; 
    nombre: string;
    departamento: string;
    municipio: string;
    direccion: string;
    barrio: string;
    info_extra: string;
    recibidor: string;
  }

export interface Producto {
    id: number;
    name: string;
    section: string;
    price: number;
    units: number;
    description: string;
}

export interface Seccion {
    _id: string;
    nombre: string;
    descripcion: string;
}