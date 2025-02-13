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