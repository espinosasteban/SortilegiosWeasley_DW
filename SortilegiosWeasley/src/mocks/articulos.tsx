import {Articulo} from '../tipos';
import {
    resenasHuevoIrrompible,
    resenasPastillasVomitas,
    resenasPocionAmor,
    resenasRemovedorAcne,
    resenasWildFire,
    resenasEscudoGuantes,
    resenasSombreroAntiGravedad,
    resenasPolvosPeruanos,
    resenasRatonesMagicos,
    resenasCarameloLonguilongo
} from './resenas';

export const articulos: Array<Articulo> = [
    {
        nombre: "Huevo Irrompible",
        precio: 800,
        descripcion: "¿Siempre temes romper los huevos mientras los transportas o cocinas? Los Huevos Irrompibles del mundo mágico son la solución perfecta. Fabricados con un encantamiento especial, estos huevos son absolutamente imposibles de romper, ¡incluso si caen desde lo alto de tu escoba!",
        imagen: "../src/assets/imagenesProductos/magiaMuggle/huevoIrrompible.png",
        seccion: "Magia Muggle",
        resenas: resenasHuevoIrrompible
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
        precio: 100,
        descripcion: "Un potente y mágico eliminador de granos en formato de spray. Inspirado en el mundo de la magia, este producto actúa en tan solo diez segundos para dejar la piel impecable. Su fórmula encantada, con un ligero resplandor dorado, se activa con un suave rocío que envuelve la piel en una brisa de partículas mágicas. Perfecto para magos y brujas que necesitan una solución rápida y efectiva antes de una gran reunión en el Callejón Diagon.",
        imagen: "../src/assets/imagenesProductos/amorBelleza/elixirRemovedorAcne.png",
        seccion: "Amor y Belleza",
        resenas: resenasRemovedorAcne
    },
    {
        nombre: "Wildfire Whizz-Bangs",
        precio: 100,
        descripcion: "Estos fuegos artificiales mágicos son imparables. Incluyen ruedas de fuego rosa impactante, dragones que escupen fuego, bengalas que escriben insultos, cohetes con largas colas de estrellas plateadas y petardos. Si dos tipos colisionan, crean combinaciones nuevas como cerdos voladores plateados y rosados.",
        imagen: "../src/assets/imagenesProductos/explosivos/wildFire.png",
        seccion: "Explosivos",
        resenas: resenasWildFire
    },

    {
        nombre: "Pastillas Vomitivas",
        precio: 20,
        descripcion: "Un dulce mágico engañosamente delicioso que, segundos después de ser ingerido, provoca un intenso pero temporal ataque de vómito. Perfecto para evitar clases aburridas o gastar bromas inolvidables.",
        imagen: "../src/assets/imagenesProductos/dulces/pastillasVomitivas.png",
        seccion: "Dulces",
        resenas: resenasPastillasVomitas
    },
    {
        nombre: "Guantes Escudo",
        precio: 250,
        descripcion: "Un guante encantado que otorga protección mágica al usuario. Forjado con runas antiguas, refuerza la resistencia ante ataques y proporciona un aura de defensa.",
        imagen: "../src/assets/imagenesProductos/defensaPersonal/escudoGuantes.png",
        seccion: "Defensa Personal",
        resenas: resenasEscudoGuantes
    },
    {
        nombre: "Sombrero Antigravedad",
        precio: 50,
        descripcion: "Un sombrero encantado que levita mágicamente cuando se usa. Perfecto para gastar bromas y sorprender a los desprevenidos. Su empaque incluye la frase: 'Arruina el día de un caballero haciendo que su sombrero vuele'.",
        imagen: "../src/assets/imagenesProductos/bromas/sombreroAntigravedad.png",
        seccion: "Bromas",
        resenas: resenasSombreroAntiGravedad
    },
    {
        nombre: "Polvo Peruano de Oscuridad Instantánea",
        precio: 300,
        descripcion: "Un polvo encantado importado por los gemelos Weasley que crea una oscuridad impenetrable al usarse. Perfecto para escapar sin ser visto.",
        imagen: "../src/assets/imagenesProductos/defensaPersonal/polvosPeruanos.png",
        seccion: "Defensa Personal",
        resenas: resenasPolvosPeruanos
    },
    {
        nombre: "Los Ratones Mágicos de María",
        precio: 600,
        descripcion: "Unos traviesos ratones encantados que se escapan, flotan y desaparecen en el aire cuando intentas atraparlos. Perfectos para jugar bromas.",
        imagen: "../src/assets/imagenesProductos/magiaMuggle/ratonesMagicos.png",
        seccion: "Magia Muggle",
        resenas: resenasRatonesMagicos
    },
    {
        nombre: "Caramelo Longuilonguo",
        precio: 10,
        descripcion: "Un dulce encantado que hace que la lengua del consumidor crezca de forma exagerada durante varios minutos. Ideal para bromas y travesuras.",
        imagen: "../src/assets/imagenesProductos/dulces/lenguaLongui.png",
        seccion: "Dulces",
        resenas: resenasCarameloLonguilongo
    }

];




