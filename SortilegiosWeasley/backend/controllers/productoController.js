import Producto from '../modelos/producto.js';
import {validarProducto, validarProductoParcial} from '../esquemas/esquemas.js';

class productoController {

    async create(req, res) {
        try {
            const result = validarProducto(req.body);

            if (!result.success){
                return res.status(400).json({ error: JSON.parse(result.error.message) })
            }

            const producto = new Producto(req.body);
            const nuevoProducto = await producto.save();
            console.log("Producto creado con éxito");
            res.status(201).json(nuevoProducto);

        } catch (error) {
            console.log("Error creando el producto");
            res.status(500).json({error: 'Error creando el producto',detalles: error.message});
        }
    }

    async getAll(req, res) {
        try {
            const productos = await Producto.find();
            res.status(200).json(productos);
            console.log("Productos obtenidos con éxito");
        } catch (error) {
            console.log("Error obteniendo los productos");
            res.status(500).json({error: 'Error obteniendo los productos'});
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;
            const producto = await Producto.findById(id);
            if (producto) {
                res.status(200).json(producto);
                console.log("Producto obtenido con éxito");
            } else {
                console.log("Producto no encontrado");
                res.status(404).json({error: 'Producto no encontrado'});
            }
        }
        catch (error) {
            console.log("Error obteniendo el producto");
            res.status(500).json({error: 'Error obteniendo el producto'});
        }
    }

    async update(req, res) {
        try {
            const result = validarProductoParcial(req.body);

            if (!result.success){
                return res.status(400).json({ error: JSON.parse(result.error.message) })
            }
            
            const { id } = req.params;
            const producto = await Producto.findByIdAndUpdate(id, req.body, { new: true });

            if (producto) {
                res.status(200).json(producto);
                console.log("Producto actualizado con éxito");
            } else {
                console.log("Producto no encontrado");
                res.status(404).json({error: 'Producto no encontrado'});
            }
        }
        catch (error) {
            console.log("Error actualizando el producto");
            res.status(500).json({error: 'Error actualizando el producto'});
        }
    }

    async delete(req, res) {
        try { 
            const { id } = req.params;
            const producto = await Producto.findByIdAndDelete(id);

            if (producto) {
                res.status(200).json(producto);
                console.log("Producto eliminado con éxito");
            } else {
                console.log("Producto no encontrado");
                res.status(404).json({error: 'Producto no encontrado'});
            }
        }
        catch (error) {
            console.log("Error eliminando el producto");
            res.status(500).json({error: 'Error eliminando el producto'});
        }
    }
}
export default new productoController();