import productoModelo from '../modelos/productos.js';

class productoController{
    constructor(){}

    async create(req, res){
        try{
            const data = await productoModelo.create(req.body);
            res.status(201).json(data);
        }catch(error){
            res.status(500).send(error);
        }
    }

    async update(req, res){
        try{
            const { id } = req.params;
            const data = await productoModelo.update(id, req.body);
            res.status(201).json(data);
        }catch(error){
            res.status(500).send(error);
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
    }

    async getOne(req, res){
        try{
            const { id } = req.params;
            const data = await productoModelo.getOne(id);
            res.status(201).json(data);
        }catch(error){
            res.status(500).send(error);
        }
    }
}

export default new productoController();