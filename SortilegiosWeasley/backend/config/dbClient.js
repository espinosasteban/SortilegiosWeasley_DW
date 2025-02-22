import 'dotenv/config';
import {MongoClient} from 'mongodb';

class dbClient{
    constructor(){
        const queryString = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@${process.env.SERVER_DB}/?retryWrites=true&w=majority&appName=Sortilegios`;
        this.client = new MongoClient(queryString);
        this.conectarBD();
    }

    async conectarBD() {
        try{
            await this.client.connect();
            this.db = this.client.db('SortilegiosWeasley');
            console.log('Conexión a la base de datos exitosa');
        }catch (e){
            console.log(e);
        }
    }
}

export default new dbClient();