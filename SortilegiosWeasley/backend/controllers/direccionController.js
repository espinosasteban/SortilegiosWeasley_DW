import Direccion from '../modelos/direccion.js';
import {validarDireccion, validarDireccionParcial} from '../esquemas/esquemas.js';

class direccionController {

    async create(req, res) {
        try {
            const result = validarDireccion(req.body);

            if (!result.success){
                return res.status(400).json({ error: JSON.parse(result.error.message) })
            }

            const direccion = new Direccion(req.body);
            const nuevaDireccion = await direccion.save();
            console.log("direccion creada con éxito");
            res.status(201).json(nuevaDireccion);

        } catch (error) {
            console.log("Error creando la direccion");
            res.status(500).json({error: 'Error creando la direccion'});
        }
    }

    async getAll(req, res) {
        try {
            const direcciones = await Direccion.find();
            res.status(200).json(direcciones);
            console.log("direcciones obtenidas con éxito");
        } catch (error) {
            console.log("Error obteniendo las direcciones");
            res.status(500).json({error: 'Error obteniendo las direcciones'});
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;
            const direccion = await Direccion.findById(id);
            if (direccion) {
                res.status(200).json(direccion);
                console.log("direccion obtenida con éxito");
            } else {
                console.log("direccion no encontrada");
                res.status(404).json({error: 'direccion no encontrada'});
            }
        }
        catch (error) {
            console.log("Error obteniendo la direccion");
            res.status(500).json({error: 'Error obteniendo la direccion'});
        }
    }

    async update(req, res) {
        try {
            const result = validarDireccionParcial(req.body);

            if (!result.success){
                return res.status(400).json({ error: JSON.parse(result.error.message) })
            }
            
            const { id } = req.params;
            const direccion = await Direccion.findByIdAndUpdate(id, req.body, { new: true });

            if (direccion) {
                res.status(200).json(direccion);
                console.log("direccion actualizada con éxito");
            } else {
                console.log("direccion no encontrada");
                res.status(404).json({error: 'direccion no encontrada'});
            }
        }
        catch (error) {
            console.log("Error actualizando la direccion");
            res.status(500).json({error: 'Error actualizando la direccion'});
        }
    }

    async delete(req, res) {
        try { 
            const { id } = req.params;
            const direccion = await Direccion.findByIdAndDelete(id);

            if (direccion) {
                res.status(200).json(direccion);
                console.log("direccion eliminada con éxito");
            } else {
                console.log("direccion no encontrada");
                res.status(404).json({error: 'direccion no encontrada'});
            }
        }
        catch (error) {
            console.log("Error eliminando la direccion");
            res.status(500).json({error: 'Error eliminando la direccion'});
        }
    }
}
export default new direccionController();