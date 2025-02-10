export interface Articulo {

    nombre: string;
    precio: number;
    descripcion: string;
    imagen: string;
    seccion: string;
    resenas: Array<ResenaArticulo>;

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