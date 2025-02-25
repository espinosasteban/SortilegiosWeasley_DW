import Seccion from '../modelos/seccion.js';

class seccionController {


    async create(req, res) {
        try {
            const seccion = new Seccion(req.body);
            const nuevaSeccion = await seccion.save();

            res.status(201).json(nuevaSeccion);
        } catch (error) {
            res.status(500).json({error: 'Error creando la seccion'});
        }
    };

    async getAll(req, res) {
        try {
            const seccion = await Seccion.find();
            res.status(200).json(seccion);
            console.log("Secciones obtenidos con éxito");
        } catch (error) {
            console.log("Error obteniendo las secciones");
            res.status(500).json({error: 'Error obteniendo las secciones'});
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;
            const seccion = await Seccion.findById(id);
            if (seccion) {
                res.status(200).json(seccion);
                console.log("Sección obtenida con éxito");
            } else {
                console.log("Sección no encontrada");
                res.status(404).json({error: 'Sección no encontrada'});
            }
        }
        catch (error) {
            console.log("Error obteniendo la sección");
            res.status(500).json({error: 'Error obteniendo la sección'});
        }
    }


}

export default new seccionController();

