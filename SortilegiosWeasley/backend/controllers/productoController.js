import Producto from '../modelos/producto.js';

class productoController {

    async create(req, res) {
        try {
            const producto = new Producto(req.body);
            const nuevoProducto = await producto.save();
            console.log("Producto creado con éxito");
            res.status(201).json(nuevoProducto);
        } catch (error) {
            console.log("Error creando el producto");
            res.status(500).json({error: 'Error creando el producto'});
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

   
}

export default new productoController();

    /*


    async update(req, res){

        if (!req.body) {
            return res.status(400).send({ message: "Los datos a actualizar no pueden estar vacíos" });
        }

        try{
            const { id } = req.params;
            const data = await Producto.findByIdAndUpdate(id, req.body, { useFindAndModify: false });

            if (!data) {
                res.status(404).send({ message: `No se puede actualizar el producto con id=${id}. No se encontró el producto` });
            } else {
                res.status(200).send({ message: "Producto actualizado con éxito" });
            }

        }catch(error){
            res.status(500).send({ message: "Error actualizando el producto con id=" + id });
        }
    }

    async delete(req, res){
        try{
            const { id } = req.params;
            const data = await productoModelo.delete(id);
            res.status(206).json(data);
        }catch(error){
            res.status(500).send(error);
        }
    }

    async getAll(req, res){
        try{
            const data = await productoModelo.getAll();
            res.status(201).json(data);
        }catch(error){
            res.status(500).send(error);
        }
    };

    async getOne(req, res){
        try{
            const { id } = req.params;
            const data = await productoModelo.getOne(id);
            res.status(201).json(data);
        }catch(error){
            res.status(500).send(error);
        }
    };
}
*/


