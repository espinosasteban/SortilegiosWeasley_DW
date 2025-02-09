export interface Articulo {

    nombre: string;
    precio: number;
    descripcion: string;
    imagen: string;
    seccion: string;
    resenas: Array<ResenaArticulo>;

}


export interface ResenaArticulo {
    nombreUsuario: string;
    fechaComentario: string;
    comentario: string;
    calificacion: number;
    cantidadEsUtil: number;
    cantidadNoEsUtil: number;

}