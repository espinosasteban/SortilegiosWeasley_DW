import {z} from 'zod';
import mongoose from "mongoose";


// Esquema de validación de datos Usuario
const UsuarioSchema = z.object({
    nombreUsuario: z.string().min(3, "El usuario debe tener al menos 3 caracteres"),
    contrasena: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
    correo: z.string().email("Correo no válido"),
    rol: z.enum(["muggle", "admin"]),
    nombre: z.string().min(1, "El nombre es obligatorio"),
    apellido: z.string().min(1, "El apellido es obligatorio"),
    documento: z.string().min(5, "Documento inválido"),
    telefonoPersonal: z.string().optional(),
    fechaNacimiento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato: YYYY-MM-DD"),
});

export function validarUsuario (input){
    return UsuarioSchema.safeParse(input);
}

export function validarUsuarioParcial (input){
    return UsuarioSchema.partial().safeParse(input);
}


// Esquema de validación de datos Direccion
const DireccionSchema = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio"),
    departamento: z.string().min(1, "El departamento es obligatorio"),
    municipio: z.string().min(1, "El municipio es obligatorio"),
    direccion: z.string().min(5, "Dirección inválida"),
    info_extra: z.string().optional(),
    barrio: z.string().optional(),
    recibidor: z.string().min(1, "El nombre de quien recibe es obligatorio"),
    usuario: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "ID de usuario inválido"
    })
});

export function validarDireccion (input){
    return DireccionSchema.safeParse(input);
}

export function validarDireccionParcial (input){
    return DireccionSchema.partial().safeParse(input);
}


// Esquema de validación de datos Carrito
const CarritoSchema = z.object({
    userId: z.string().min(1, "El ID del usuario es obligatorio"), 
    items: z.array(
      z.object({
        productoId: z.string().min(1, "El ID del producto es obligatorio"),
        total_items: z.number().min(1, "La cantidad debe ser al menos 1"),
      })
    )
});

export function validarCarrito(input) {
    return CarritoSchema.safeParse(input);
}
  
export function validarCarritoParcial(input) {
    return CarritoSchema.partial().safeParse(input);
}



// Esquema de validación de datos DetalleCarrito
const DetalleCarritoSchema = z.object({
    cantidadPedida: z.number().int().positive("La cantidad debe ser mayor a 0"),
    totalPorProducto: z.number().positive("El total debe ser positivo"),
});

export function validarDetalleCarrito (input){
    return DetalleCarritoSchema.safeParse(input);
}

export function validarDetalleCarritoParcial (input){
    return DetalleCarritoSchema.partial().safeParse(input);
}


// Esquema de validación de datos Pedido
const PedidoSchema = z.object({
    fechaPedido: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato: YYYY-MM-DD"),
});

export function validarPedido (input){
    return PedidoSchema.safeParse(input);
}

export function validarPedidoParcial (input){
    return PedidoSchema.partial().safeParse(input);
}


// Esquema de validación de datos Producto
const ProductoSchema = z.object({
    nombre: z.string().min(1, "El nombre del producto es obligatorio"),
    descripcion: z.string().min(1, "La descripción es obligatoria"),
    img: z.string(),
    precio: z.number().positive("El precio debe ser mayor a 0"),
    unidadesStock: z.number().int().nonnegative("Las unidades en stock deben ser 0 o más"),
    seccion: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "ID de seccion inválido"
    })
});

export function validarProducto (input){
    return ProductoSchema.safeParse(input);
}

export function validarProductoParcial (input){
    return ProductoSchema.partial().safeParse(input);
}


// Esquema de validación de datos Seccion
const SeccionSchema = z.object({
    nombre: z.string().min(1, "El nombre de la sección es obligatorio"),
    descripcion: z.string().optional(),
});

export function validarSeccion (input){
    return SeccionSchema.safeParse(input);
}

export function validarSeccionParcial (input){
    return SeccionSchema.partial().safeParse(input);
}


// Esquema de validación de datos Resena
const ResenaSchema = z.object({
    puntuacion: z.number().int().min(1).max(5, "La puntuación debe estar entre 1 y 5"),
    fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato: YYYY-MM-DD"),
    comentario: z.string().min(1, "El comentario es obligatorio"),
    recuentoUtil: z.number().int().nonnegative("El recuento útil debe ser 0 o más"),
    recuentoNoUtil: z.number().int().nonnegative("El recuento no útil debe ser 0 o más"),
    producto: z.string(),
    usuario: z.string(),
});

export function validarResena (input){
    return ResenaSchema.safeParse(input);
}

export function validarResenaParcial (input){
    return ResenaSchema.partial().safeParse(input);
}


// Esquema de validación de datos Lechuza
const LechuzaSchema = z.object({
    nombre: z.string().min(1, "El nombre de la lechuza es obligatorio"),
    foto: z.string().url("Debe ser una URL válida"),
    estado: z.enum(["disponible", "en entrega", "descansando"]),
});

export function validarLechuza (input){
    return LechuzaSchema.safeParse(input);
}

export function validarLechuzaParcial (input){
    return LechuzaSchema.partial().safeParse(input);
}
