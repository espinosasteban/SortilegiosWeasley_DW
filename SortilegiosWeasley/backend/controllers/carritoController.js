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

    async addCart(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ error: "Usuario no autenticado" });
            }

            const { userId, productoId, total_items } = req.body;
            console.log(req.body);
            console.log("Id", productoId);
            console.log("items:", total_items);

            const carrito = await Carrito.findOne({ userId: userId});

            if (carrito) {
                const productExist = carrito.items.findIndex(
                    (item) => item.productoId.toString() === productoId
                );

                if (productExist !== -1) {
                    await Carrito.findOneAndUpdate(
                        {userId: userId, "items.productoId": productoId },
                        { $inc: { "items.$.total_items": 1 } },
                        { new: true}
                    );
                    res.status(200).json({
                        message: "Agregado al carrito"
                    });
                } else {
                    await Carrito.findOneAndUpdate(
                        { userId: userId},
                        { $push: {items: { productoId: productoId,
                                           total_items: total_items}}},
                        { new: true}
                    );

                    res.status(200).json({
                        message: "Nuevo producto agregado al carrito"
                    });

                };
            } else {
                await Carrito.create({
                    userId: userId,
                    items: [{ productoId: productoId,
                            total_items: total_items
                    }]
                });
                res.status(201).json({message: "Carrito creado con éxito"})
            }

        } catch ( error ) {
            res.status(500).json({ error: "Error agregando productos en el carrito" });
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
}

export default new CarritoController();