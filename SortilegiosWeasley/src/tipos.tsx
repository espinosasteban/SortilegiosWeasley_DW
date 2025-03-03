export interface Articulo {
    _id: string;
    nombre: string, 
    descripcion: string,
    img: string,
    precio: number,
    unidadesStock: number,
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
    id: string;
    _id: string;
    nombre: string;
    departamento: string;
    municipio: string;
    direccion: string;
    barrio: string;
    info_extra?: string;
    recibidor?: string;
    usuario?: string;
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

export interface Usuario {
    _id: string;
    nombreUsuario: string;
    contrasena: string;
    correo: string;
    rol: string;
    nombre: string;
    apellido: string;
    documento: string;
    telefono: string;
    fechaNacimiento: Date;
}