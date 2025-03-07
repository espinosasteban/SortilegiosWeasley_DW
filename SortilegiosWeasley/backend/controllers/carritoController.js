import Carrito from '../modelos/carrito.js';
import Producto from '../modelos/producto.js';
import { validarCarrito, validarCarritoParcial } from '../esquemas/esquemas.js';

class CarritoController {
    
    async create(req, res) {
        try {
            console.log("Se intento agregar el producto")

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
            if (!req.user) {
                return res.status(401).json({ error: "Usuario no autenticado" });
            }
    
            
            const carrito = await Carrito.findOne({ userId: req.user.id })
                .populate({
                    path: "items.productoId",
                    populate: { path: "seccion", select: "nombre" } // Obtiene el nombre de la sección
                });
    
            if (!carrito) {
                return res.status(404).json({ error: "Carrito no encontrado" });
            }

            const itemsFormateados = carrito.items.map(item => ({
                _id: item.productoId._id,
                nombre: item.productoId.nombre,
                descripcion: item.productoId.descripcion,
                img: item.productoId.img,
                precio: item.productoId.precio,
                unidadesStock: item.productoId.unidadesStock,
                seccion: item.productoId.seccion ? item.productoId.seccion.nombre : "Sin sección", 
                __v: item.productoId.__v,
                total_items: item.total_items
            }));
    
            res.json({
                _id: carrito._id,
                userId: carrito.userId,
                items: itemsFormateados,
            });
    
        } catch (error) {
            console.error("❌ Error obteniendo el carrito:", error);
            res.status(500).json({ error: "Error obteniendo el carrito" });
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

    async increaseItemQty(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ error: "Usuario no autenticado" });
            }
            
            const { userId } = req.params
            const { productoId } = req.body
            const carrito = await Carrito.findOne( {userId: userId } );

            if (!carrito) {
                res.status(404).json({ error: 'Carrito no encontrado' })
            }

            const carritoActualizado = await Carrito.findOneAndUpdate(
                { userId: userId, "items.productoId": productoId }, 
                { $inc: { "items.$.total_items": 1 } }, 
                { new: true }
            );
    
            if (!carritoActualizado) {
                return res.status(404).json({ error: "Producto no encontrado en el carrito" });
            }
    
            res.status(200).json({ message: "Cantidad de productos aumentada", carrito: carritoActualizado });
        } catch (error) {
            console.error("Error en increaseItemQty:", error);
            res.status(500).json({ error: "Error actualizando el producto en el carrito" });
        }
    }
    
    async decreaseItemQty(req,res) {
        try {
            if (!req.user) {
                return res.status(401).json({ error: "Usuario no autenticado" });
            }
            const { userId } = req.params;
            const { productoId} = req.body;
            console.log(req.params)

            const  carrito = await Carrito.findOne({ userId: userId });

            if (!carrito) {
                res.status(404).json({ error: 'Carrito no encontrado' });
            };

            // Buscar el producto dentro del carrito
            const item = carrito.items.find(i => i.productoId.toString() === productoId);

            if (!item) {
                return res.status(404).json({ error: "Producto no encontrado en el carrito" });
            }

            if (item.total_items > 1) {
                const carritoActualizado = await Carrito.findOneAndUpdate(
                    { userId: userId, "items.productoId": productoId },
                    { $inc: { "items.$.total_items": -1 } },
                    { new: true }
                );
                return res.status(200).json({ message: "Cantidad de productos disminuida" , carrito: carritoActualizado });
            } else {
                await Carrito.findOneAndUpdate(
                    { userId: userId },
                    { $pull: { items: {productoId:productoId }} }, // Elimina el producto
                    { new: true }
                );
                return res.status(200).json({ message: "Producto eliminado del carrito"});
            };
            
        } catch (error) {
            console.error("Error en decreaseItemQty:", error);
            res.status(500).json({ error: "Error actualizando el producto en el carrito" });
        }
    }


    async deleteItem(req, res) {
        try {
           if (!req.user) {
            return res.status(401).json({ error: "Usuario no autenticado" });
           };

           const {userId} = req.params;
           const {productoId} = req.body;

           const carrito = await Carrito.findOne( { userId: userId} );

           if (!carrito) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
           }

           const item = carrito.items.find(id => id.productoId.toString()===productoId);
           console.log(item)
           console.log(productoId)

           if (!item) {
            return res.status(404).json({ error: 'Producto no encontrado' });
           }

           await Carrito.findOneAndUpdate(
            {userId: userId},
            {$pull: { items: {productoId: productoId},}},
            {new: true}
            );

            return res.status(200).json({ message: "Producto eliminado del carrito"});
        } catch ( error) {
            console.error("Error en deleteItem:", error);
            res.status(500).json({ error: "Error eliminando el producto en el carrito" });
        }
    }
    

    async updateItem(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ error: "Usuario no autenticado" });
            }
    
            const { productoId } = req.params;
            const { total_items } = req.body;
    
            if (total_items < 1) {
                return res.status(400).json({ error: "La cantidad debe ser al menos 1" });
            }
    
            const carrito = await Carrito.findOne({ userId: req.user.id });
    
            if (!carrito) {
                return res.status(404).json({ error: "Carrito no encontrado" });
            }
    
            // Buscar el producto dentro del carrito
            const itemIndex = carrito.items.findIndex(item => item.productoId.toString() === productoId);
    
            if (itemIndex === -1) {
                return res.status(404).json({ error: "Producto no encontrado en el carrito" });
            }
    
            // Modificar la cantidad del producto
            carrito.items[itemIndex].cantidad = total_items;
    
            await carrito.save();
    
            res.status(200).json(carrito);
            
    
        } catch (error) {
            res.status(500).json({ error: "Error actualizando el producto en el carrito" });
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
        const { userId } = req.user; 
        const { items } = req.body;
        console.log("Migré el carrito")

        try {
            
            let carrito = await Carrito.findOne( {userId} );
    
            if (!carrito) {
                carrito = new Carrito({ userId, items: [] });
            }
            // Agregar los nuevos productos al carrito
            for (const item of items) {
                const producto = await Producto.findById(item.productoId);
                if (producto) {
                    // Verificar si el producto ya está en el carrito
                    const itemIndex = carrito.items.findIndex(i => i.productoId.toString() === item.productoId);
                    if (itemIndex >= 0) {
                        // Si el producto ya está en el carrito, actualizar la cantidad
                        carrito.items[itemIndex].total_items += item.total_items;
                    } else {
                        // Si el producto no está en el carrito, agregarlo
                        carrito.items.push(item);
                    }
                }
            }

            // Guardar el carrito actualizado
            await carrito.save();

            res.status(200).json({ message: 'Carrito migrado exitosamente', carrito });
        } catch (error) {
            res.status(500).json({ message: 'Error al migrar el carrito', error });
        }
    };

    
}

export default new CarritoController();