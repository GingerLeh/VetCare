import {MongoClient, ObjectId} from 'mongodb';
import Cliente from '../modelo/cliente.js';
import Pet from '../modelo/Pet.js';

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
                    "endereco":cliente.endereco,
                    "numero":cliente.numero,
                    "complemento":cliente.complemento,
                    "bairro":cliente.bairro,
                    "cep":cliente.cep,
                    "cidade":cliente.cidade,
                    "estado":cliente.estado,
                    "contato":cliente.contato
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
                        "endereco":cliente.endereco,
                        "numero":cliente.numero,
                        "complemento":cliente.complemento,
                        "bairro":cliente.bairro,
                        "cep":cliente.cep,
                        "cidade":cliente.cidade,
                        "estado":cliente.estado,
                        "contato":cliente.contato
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
                const clienteEncontrado = new Cliente(resultado._id, resultado.nome, resultado.rg, resultado.cpf,
                        resultado.dtNasc, resultado.endereco, resultado.numero, resultado.complemento, resultado.bairro,
                        resultado.cep, resultado.cidade, resultado.estado, resultado.contato);
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
                //resultado.forEach((elemento) => { não adequado para chamada assíncrona
                for (const elemento of resultado){
                    const documentosPets = await this.clienteMongo.db(baseDados).collection("Pets").find({"codProprietario":elemento._id.toString()}).toArray();
                    let listaPets = documentosPets.map((docPet) => {
                        return new Pet(docPet._id.toString(), docPet.nome, docPet.raca, docPet.peso, docPet.dataNascimento, docPet.porte, docPet.codProprietario);
                    });
                    const cliente = new Cliente(
                        elemento._id,
                        elemento.nome,
                        elemento.rg,
                        elemento.cpf,
                        elemento.dtNasc,
                        elemento.endereco,
                        elemento.numero,
                        elemento.complemento,
                        elemento.bairro,
                        elemento.cep,
                        elemento.cidade,
                        elemento.estado,
                        elemento.contato, 
                        listaPets);

                    listaCliente.push(cliente);
                };
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