import {Articulo} from '../tipos';
import {resenasHuevoIrrompible, resenasPocionAmor, resenasRemovedorAcne} from './resenas';

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
    },

    {
        nombre: "Bomba Arcana Oscura",
        precio: 150,
        descripcion: "Una esfera encantada de diseño minimalista, con líneas de energía arcana que pulsan suavemente. Su fusible brillante emite chispas mágicas, indicando su inestabilidad. Perfecta para crear efectos espectaculares en duelos y travesuras mágicas.",
        imagen: "../src/assets/imagenesProductos/explosivos/bomba.png",
        seccion: "Explosivos",
        resenas: []

    },
    {
        nombre: "Varita Mágica Fake",
        precio: 300,
        descripcion: "✨ ¡Despierta el mago o bruja que llevas dentro con esta impresionante Varita Mágica Minimalista! ✨ Inspirada en el mágico mundo de Harry Potter, esta varita combina un diseño elegante y moderno con un toque de encanto sobrenatural. Su punta emite un brillo etéreo que te transportará directamente a las aulas de Hogwarts -o eso dicen-. ¿Estás list@ para lanzar hechizos épicos? ¡No querrás dejarla en casa!",
        imagen: "../src/assets/imagenesProductos/bromas/varita.png",
        seccion: "Bromas",
        resenas: []

    },
    {
        nombre: "Poción de Amor",
        precio: 200, 
        descripcion: "Una poción mágica inspirada en el mundo de los magos, contenida en un elegante frasco en forma de corazón. Su líquido rosa brillante gira suavemente en su interior, desprendiendo un aura encantadora. Sellada con un tapón de corcho y un sello dorado, esta poción emana un aroma dulce y embriagador que cautiva al instante. Se dice que aquellos que la perciben experimentan un latido acelerado y una irresistible sensación de atracción. Perfecta para hechizar corazones… ¡o para decorar tu colección de artefactos mágicos! ✨",
        imagen: "../src/assets/imagenesProductos/amorBelleza/pocionAmor.png",
        seccion: "Amor y Belleza",
        resenas: resenasPocionAmor
    },

    {
        nombre: "Elixir removedor de acné",
        precio: 12,
        descripcion: "Un potente y mágico eliminador de granos en formato de spray. Inspirado en el mundo de la magia, este producto actúa en tan solo diez segundos para dejar la piel impecable. Su fórmula encantada, con un ligero resplandor dorado, se activa con un suave rocío que envuelve la piel en una brisa de partículas mágicas. Perfecto para magos y brujas que necesitan una solución rápida y efectiva antes de una gran reunión en el Callejón Diagon.",
        imagen: "../src/assets/imagenesProductos/amorBelleza/elixirRemovedorAcne.png",
        seccion: "Amor y Belleza",
        resenas: resenasRemovedorAcne
    }
];




