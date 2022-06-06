import {MongoClient, ObjectId} from 'mongodb';
import Cliente from '../modelo/cliente.js';
import Pet from '../modelo/pets.js';
const urlBancoDados = "mongodb://localhost:27017";
const baseDados = "VetCare";
const colecao = "Clientes";

export default class ClienteDB{

    constructor(){
        this.clienteMongo = new MongoClient(urlBancoDados);
    }

    
    //métodos 
    async incluir (cliente){
        if (cliente instanceof Cliente){
            try{
                await this.clienteMongo.connect();
                const resultado = await this.clienteMongo.db(baseDados).collection(colecao)
                .insertOne({
                    "nome":cliente.nome,
                    "rg":cliente.rg,
                    "cpf":cliente.cpf,
                    "dtNasc":cliente.dtNasc,
                    "cep":cliente.cep,
                    "endereco":cliente.endereco,
                    "numero":cliente.numero,
                    "complemento":cliente.complemento,
                    "bairro":cliente.bairro,
                    "cidade":cliente.cidade,
                    "estado":cliente.estado,
                    "contato":cliente.contato,
                    "email":cliente.email,
                    "observacao":cliente.observacao
                });
                cliente.id = resultado.insertedId.toString();
    
            }catch(e){
                console.error(e);
            }
            finally{
                await this.clienteMongo.close();
            }    
        }
    }


    async atualizar(cliente){
        if (cliente instanceof Cliente){
            try{
                await this.clienteMongo.connect();
                const identificador = new ObjectId(cliente.id);
				const resultado = await this.clienteMongo.db(baseDados).collection(colecao)
                .updateOne({'_id':identificador}, {"$set":{
                        "nome":cliente.nome,
                        "rg":cliente.rg,
                        "cpf":cliente.cpf,
                        "dtNasc":cliente.dtNasc,
                        "cep":cliente.cep,
                        "endereco":cliente.endereco,
                        "numero":cliente.numero,
                        "complemento":cliente.complemento,
                        "bairro":cliente.bairro,
                        "cidade":cliente.cidade,
                        "estado":cliente.estado,
                        "contato":cliente.contato,
                        "email":cliente.email,
                        "observacao":cliente.observacao
                    }
                });
                if (resultado.modifiedCount > 0){
                    return {
                        "resultado":true
                    }
                }
                else {
                    return {
                        "resultado":false
                    }
                }
            }catch(e){
                console.error(e);
            }
            finally{
                await this.clienteMongo.close();
            }
        }
    }


    async excluir(cliente){
        if (cliente instanceof Cliente){
            try{
                await this.clienteMongo.connect();
                const identificador = new ObjectId(cliente.id);
				const resultado = await this.clienteMongo.db(baseDados).collection(colecao)
                .deleteOne({"_id":identificador});                
                if (resultado.deletedCount > 0){
                    return {
                        "resultado":true
                    }
                }
                else{
                    return {
                        "resultado":false
                    }
                }
            }catch(e){
                console.error(e);
            }
            finally{
                await this.clienteMongo.close();
            }
        }
    }


    async consultaPorId(id){
        try{
            await this.clienteMongo.connect();
            const identificador = new ObjectId(id);
            const resultado = await this.clienteMongo.db(baseDados).collection(colecao)
            .findOne({"_id":identificador});
            if (resultado){
                const docPets = await this.clienteMongo.db(baseDados).collection("Pets").
                find({"codProprietario":resultado._id.toString()}).toArray();
                let listaPets = docPets.map((docPet) => {
                    return new Pet(docPet._id.toString(),
                                    docPet.nome,
                                    docPet.especie,
                                    docPet.cor,
                                    docPet.codProprietario);
                });
                const clienteEncontrado = new Cliente(resultado._id,
                                    resultado.nome,
                                    resultado.rg,
                                    resultado.cpf,
                                    resultado.dtNasc,
                                    resultado.cep,
                                    resultado.endereco,
                                    resultado.numero,
                                    resultado.complemento,
                                    resultado.bairro,
                                    resultado.cidade,
                                    resultado.estado,
                                    resultado.contato,
                                    resultado.email,
                                    resultado.observacao,
                                    listaPets);
                return clienteEncontrado;
            }
            
        }catch(e){
            console.error(e)
        }
        finally{
            await this.clienteMongo.close();
        }
    }

    async consultaPorNome(nome){
        try{
            await this.clienteMongo.connect();
            const cursor = this.clienteMongo.db(baseDados).collection(colecao)
            .find({"nome": {"$regex": nome}});
            const resultado = await cursor.toArray();
            let listaCliente = [];
            if (resultado){
                for (const elemento of resultado){
                    const docPets = await this.clienteMongo.db(baseDados).collection("Pets").
                    find({'codProprietario':elemento._id.toString()}).toArray();
                    let listaPets = docPets.map((pet) => {
                        return new Pet(pet._id.toString(),
                                       pet.nome,
                                       pet.especie,
                                       pet.cor,
                                       pet.codProprietario);
                    });
                    const cliente = new Cliente(
                        elemento._id,
                        elemento.nome,
                        elemento.rg,
                        elemento.cpf,
                        elemento.dtNasc,
                        elemento.cep,
                        elemento.endereco,
                        elemento.numero,
                        elemento.complemento,
                        elemento.bairro,
                        elemento.cidade,
                        elemento.estado,
                        elemento.contato,
                        elemento.email,
                        elemento.observacao,
                        listaPets
                    )
                    listaCliente.push(cliente)
                }
            }
            return listaCliente;

        }catch(e){
            console.error(e);
        }
        finally{
            await this.clienteMongo.close();
        }
    }
}