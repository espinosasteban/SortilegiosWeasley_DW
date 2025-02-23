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
    nombreUsuario: string;
    fechaComentario: string;
    comentario: string;
    calificacion: number;
    cantidadEsUtil: number;
    cantidadNoEsUtil: number;

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