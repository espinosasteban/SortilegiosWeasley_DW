import Resena from '../modelos/resena.js';
import {validarResena, validarResenaParcial} from '../esquemas/esquemas.js';

class resenaController {

    async create(req, res) {
        try {
            const result = validarResena(req.body);

            if (!result.success){
                return res.status(400).json({ error: JSON.parse(result.error.message) })
            }

            const resena = new Resena(req.body);
            const nuevoResena = await resena.save();
            console.log("resena creada con éxito");
            res.status(201).json(nuevoResena);

        } catch (error) {
            console.log("Error creando la resena");
            res.status(500).json({error: 'Error creando la resena'});
        }
    }

    async getAll(req, res) {
        try {
            const resenas = await Resena.find();
            res.status(200).json(resenas);
            console.log("resenas obtenidas con éxito");
        } catch (error) {
            console.log("Error obteniendo las resenas");
            res.status(500).json({error: 'Error obteniendo las resenas'});
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;
            const resena = await Resena.findById(id);
            if (resena) {
                res.status(200).json(resena);
                console.log("resena obtenida con éxito");
            } else {
                console.log("resena no encontrada");
                res.status(404).json({error: 'resena no encontrada'});
            }
        }
        catch (error) {
            console.log("Error obteniendo la resena");
            res.status(500).json({error: 'Error obteniendo la resena'});
        }
    }

    async update(req, res) {
        try {
            const result = validarResenaParcial(req.body);

            if (!result.success){
                return res.status(400).json({ error: JSON.parse(result.error.message) })
            }
            
            const { id } = req.params;
            const resena = await Resena.findByIdAndUpdate(id, req.body, { new: true });

            if (resena) {
                res.status(200).json(resena);
                console.log("resena actualizada con éxito");
            } else {
                console.log("resena no encontrada");
                res.status(404).json({error: 'resena no encontrada'});
            }
        }
        catch (error) {
            console.log("Error actualizando la resena");
            res.status(500).json({error: 'Error actualizando la resena'});
        }
    }

    async delete(req, res) {
        try { 
            const { id } = req.params;
            const resena = await Resena.findByIdAndDelete(id);

            if (resena) {
                res.status(200).json(resena);
                console.log("resena eliminada con éxito");
            } else {
                console.log("resena no encontrada");
                res.status(404).json({error: 'resena no encontrada'});
            }
        }
        catch (error) {
            console.log("Error eliminando la resena");
            res.status(500).json({error: 'Error eliminando la resena'});
        }
    }
}
export default new resenaController();