import {Articulo} from '../tipos';
import {resenasHuevoIrrompible} from './resenas';

export const articulos: Array<Articulo> = [
    {
        nombre: "Orejas Extensibles",
        precio: 500,
        descripcion: "Las Orejas Extensibles son el accesorio perfecto para escuchar conversaciones a distancia con total discreción. Con un diseño encantado y divertido, estas orejas se deslizan fácilmente hasta el lugar deseado, llevándote cada palabra como si estuvieras ahí.",
        imagen: "../src/assets/imagenesProductos/bromas/orejasExtensibles.png",
        seccion: "Bromas",
        resenas: []

    },
    
    {
        nombre: "Huevo Irrompible",
        precio: 800,
        descripcion: "¿Siempre temes romper los huevos mientras los transportas o cocinas? Los Huevos Irrompibles del mundo mágico son la solución perfecta. Fabricados con un encantamiento especial, estos huevos son absolutamente imposibles de romper, ¡incluso si caen desde lo alto de tu escoba!",
        imagen: "../src/assets/imagenesProductos/magiaMuggle/huevoIrrompible.png",
        seccion: "Magia Muggle",
        resenas: resenasHuevoIrrompible
    },

    {
        nombre: "Miraphorus",
        precio: 1250,
        descripcion: "¡Descubre el poder del Miraphorus, el accesorio mágico definitivo para los amantes de la escritura y el dibujo encantados! Este extraordinario objeto, creado por los ingeniosos gemelos Weasley, permite capturar con precisión cada trazo que realices en papel y duplicarlo mágicamente en otro lugar.",
        imagen: "../src/assets/imagenesProductos/magiaMuggle/miraphorus.png",
        seccion: "Magia Muggle",
        resenas: []
    }

];




