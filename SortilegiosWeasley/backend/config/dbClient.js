import {MongoClient} from 'mongodb';

class dbClient{
    constructor(){
        const queryString = "";
        this.client = new MongoClient(queryString);
    }

    async conectarBD() {
        try{
            await this.client.connect();
            this.db = this.client.db;
            console.log('Conexión a la base de datos exitosa');
        }catch (e){
            console.log(e);
        }
    }
}

export default new dbClient();