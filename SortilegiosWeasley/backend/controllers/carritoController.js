import Carrito from '../modelos/carrito.js';
import { validarCarrito, validarCarritoParcial } from '../esquemas/esquemas.js';

class carritoController {
    
    async create(req, res) {
        try {
            const result = validarCarrito(req.body);

            if (!result.success) {
                return res.status(400).json({ error: JSON.parse(result.error.message) });
            }

            const carrito = new Carrito(req.body);
            const nuevoCarrito = await carrito.save();
            console.log("Carrito creado con éxito");
            res.status(201).json(nuevoCarrito);

        } catch (error) {
            console.log("Error creando el carrito", error);
            res.status(500).json({ error: 'Error creando el carrito' });
        }
    }

    async getAll(req, res) {
        try {
            const carritos = await Carrito.find();
            res.status(200).json(carritos);
            console.log("Carritos obtenidos con éxito");
        } catch (error) {
            console.log("Error obteniendo los carritos", error);
            res.status(500).json({ error: 'Error obteniendo los carritos' });
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
    
            const { productos } = req.body;
    
            if (!productos || productos.length === 0) {
                return res.status(400).json({ error: "No hay productos para migrar" });
            }
    
            // Crear carrito para el usuario logueado
            const nuevoCarrito = new Carrito({
                usuario: req.user.id,
                productos,
                total: productos.reduce((sum, p) => sum + (p.precio * p.cantidad), 0) 
            });
    
            await nuevoCarrito.save();
    
            res.json({ mensaje: "Carrito migrado exitosamente", carrito: nuevoCarrito });
        } catch (error) {
            console.error("Error migrando carrito:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    };
}

export default new carritoController();
