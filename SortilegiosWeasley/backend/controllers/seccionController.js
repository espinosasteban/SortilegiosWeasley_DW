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


}

export default new seccionController();

