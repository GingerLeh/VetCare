import {MongoClient, ObjectId} from 'mongodb';
import Pet from '../modelo/pets.js';

const uriBancoDados = "mongodb://localhost:27017";
const baseDados = "Atividade3";
const colecao = "Pets";

export default class PetDB{

    constructor(){
        this.petMongo = new MongoClient(uriBancoDados);
    } 

    async incluir(pet){
        if (pet instanceof Pet){
            try{ //aguardar a conexão ser estabelicida
                await this.petMongo.connect();
                const resultado = await this.petMongo.db(baseDados).collection(colecao)
                .insertOne({"nome": pet.nome, "raca":pet.raca, "peso": pet.peso, "dataNascimento": pet.dataNascimento, "porte": pet.porte});
                pet.id = resultado.insertedId.toString();
            } 
            catch(e){
                console.error(e);
            }
            finally{
                await this.petMongo.close();
            }
        }
    }

    async atualizar(pet){
        if (pet instanceof Pet){
            try{
                await this.petMongo.connect();
                const identificador = new ObjectId(pet.id);
                const resultado = await this.petMongo.db(baseDados).collection(colecao)
                .updateOne({'_id':identificador}, {"$set":{
                    "nome": pet.nome, 
                    "raca":pet.raca, 
                    "peso": pet.peso, 
                    "dataNascimento": pet.dataNascimento, 
                    "porte": pet.porte}
                });
                if (resultado.modifiedCount > 0){
                    return {
                        "resultado": true
                    }
                }
                else {
                    return{
                        "resultado": false
                    }
                }
            }
            catch(e){
                console.error(e);

            }
            finally{
                await this.petMongo.close();//comando sempre será executado
            }
        }
    }

    async excluir(pet){
        if (pet instanceof Pet){
            try{
                await this.petMongo.connect();
                const identificador = new ObjectId(pet.id);
                const resultado = await this.petMongo.db(baseDados).collection(colecao)
                .deleteOne({'_id':identificador});
                if (resultado.deletedCount > 0){
                    return {
                        "resultado": true
                    }
                }
                else {
                    return{
                        "resultado": false
                    }
                }
            }
            catch(e){
                console.error(e);
            }
            finally{
                await this.petMongo.close();//comando sempre será executado
            }
        }
    }

    async consultarPorID(id){
        try{
            await this.petMongo.connect();
            const identificador = new ObjectId(id);
            const resultadoBusca = await this.petMongo.db(baseDados).collection(colecao)
            .findOne({"_id":identificador}); 
            if (resultadoBusca){
                const petBuscado = new Pet(resultadoBusca._id,
                                           resultadoBusca.nome,
                                           resultadoBusca.raca,
                                           resultadoBusca.peso,
                                           resultadoBusca.dataNascimento,
                                           resultadoBusca.porte);
                return petBuscado;
            }

        }
        catch(e){
            console.error(e);
        }
        finally{
            await this.petMongo.close();
        }
    }

    async consultarPeloNome(nome){
        try{
            await this.petMongo.connect();
            const cursor =  this.petMongo.db(baseDados).collection(colecao)
            .find({"nome":{"$regex":nome}});
            const resultados = await cursor.toArray();
            let listaPets = [];
            if (resultados){
                resultados.forEach((resultado) => {
                    const pet = new Pet(resultado._id,
                                        resultado.nome,
                                        resultado.raca,
                                        resultado.peso,
                                        resultado.dataNascimento,
                                        resultado.porte);   
                    listaPets.push(pet);
                });
                return listaPets;
            }
            

        }
        catch(e){
            console.error(e);
        }
        finally{
            this.petMongo.close();
        }
    }

}