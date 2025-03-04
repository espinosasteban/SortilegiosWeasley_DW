import Carrito from '../modelos/carrito.js';
import { validarCarrito, validarCarritoParcial } from '../esquemas/esquemas.js';

class CarritoController {
    
    async create(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ error: "Usuario no autenticado" });
            }
    
            const result = validarCarrito(req.body);
            if (!result.success) {
                return res.status(400).json({ error: JSON.parse(result.error.message) });
            }
    
            let carritoExistente = await Carrito.findOne({ userId: req.user.id });
    
            if (carritoExistente) {
                return res.status(400).json({ error: "El usuario ya tiene un carrito" });
            }
    
            const carrito = new Carrito({ ...req.body, userId: req.user.id });
            const nuevoCarrito = await carrito.save();
    
            console.log("Carrito creado con éxito");
            res.status(201).json(nuevoCarrito);
    
        } catch (error) {
            console.log("Error creando el carrito", error);
            res.status(500).json({ error: 'Error creando el carrito' });
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;
            const carrito = await Carrito.findById(id);
            if (carrito) {
                res.status(200).json(carrito);
                console.log("Carrito obtenido con éxito");
            } else {
                console.log("Carrito no encontrado");
                res.status(404).json({ error: 'Carrito no encontrado' });
            }
        } catch (error) {
            console.log("Error obteniendo el carrito", error);
            res.status(500).json({ error: 'Error obteniendo el carrito' });
        }
    }

    async update(req, res) {
        try {
            const result = validarCarritoParcial(req.body);

            if (!result.success) {
                return res.status(400).json({ error: JSON.parse(result.error.message) });
            }

            const { id } = req.params;
            const carrito = await Carrito.findByIdAndUpdate(id, req.body, { new: true });

            if (carrito) {
                res.status(200).json(carrito);
                console.log("Carrito actualizado con éxito");
            } else {
                console.log("Carrito no encontrado");
                res.status(404).json({ error: 'Carrito no encontrado' });
            }
        } catch (error) {
            console.log("Error actualizando el carrito", error);
            res.status(500).json({ error: 'Error actualizando el carrito' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const carrito = await Carrito.findByIdAndDelete(id);

            if (carrito) {
                res.status(200).json(carrito);
                console.log("Carrito eliminado con éxito");
            } else {
                console.log("Carrito no encontrado");
                res.status(404).json({ error: 'Carrito no encontrado' });
            }
        } catch (error) {
            console.log("Error eliminando el carrito", error);
            res.status(500).json({ error: 'Error eliminando el carrito' });
        }
    }

    async migrarCarrito(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ error: "Usuario no autenticado" });
            }
    
            const { items } = req.body;
            if (!Array.isArray(items) || items.length === 0) {
                return res.status(400).json({ error: "No hay productos para migrar" });
            }
    
            let carrito = await Carrito.findOne({ userId: req.user.id });
    
            if (!carrito) {
                carrito = new Carrito({ userId: req.user.id, items });
            } else {
                const productosMap = new Map(carrito.items.map(item => [item.productoId.toString(), item]));
    
                items.forEach(({ productoId, total_items }) => {
                    if (productosMap.has(productoId)) {
                        productosMap.get(productoId).total_items += total_items;
                    } else {
                        productosMap.set(productoId, { productoId, total_items });
                    }
                });
    
                carrito.items = Array.from(productosMap.values());
            }
    
            await carrito.save();
            res.json({ mensaje: "Carrito migrado exitosamente", carrito });
    
        } catch (error) {
            console.error("Error migrando carrito:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
    
}

export default new CarritoController();
