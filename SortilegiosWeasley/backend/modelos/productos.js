import dbClient from '../config/dbClient.js';
import { ObjectId } from 'mongodb';

class productoModelo{
    async create(producto){
        const collectionProductos = dbClient.db.collection('productos');
        return await collectionProductos.insertOne(producto);
    }

    async getAll(){
        const collectionProductos = dbClient.db.collection('productos');
        return await collectionProductos.find({}).toArray();
    }

    async getOne(id){
        const collectionProductos = dbClient.db.collection('productos');
        return await collectionProductos.findOne({_id: new ObjectId(id)});
    }

    async update(id, producto){
        const collectionProductos = dbClient.db.collection('productos');
        return await collectionProductos.updateOne({_id: new ObjectId(id)}, {$set: producto});
    }

    async delete(id){
        const collectionProductos = dbClient.db.collection('productos');
        return await collectionProductos.deleteOne({_id: new ObjectId(id)});
    }
}

export default new productoModelo();