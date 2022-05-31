import {MongoClient, ObjectId} from 'mongodb';
import Funcionario from '../modelo/funcionario.js';

const urlBancoDados = "mongodb://localhost:27017";
const baseDados = "VetCare";
const colecao = "Funcionarios";

export default class FuncionarioDB{

    constructor(){
        this.funcionarioMongo = new MongoClient(urlBancoDados);
    }

    
    //métodos 
    async incluir (funcionario){
        if (funcionario instanceof Funcionario){
            try{
                await this.funcionarioMongo.connect();
                const resultado = await this.funcionarioMongo.db(baseDados).collection(colecao)
                .insertOne({
                    "nome":funcionario.nome,
                    "rg":funcionario.rg,
                    "cpf":funcionario.cpf,
                    "dtNasc":funcionario.dtNasc,
                    "endereco":funcionario.endereco,
                    "numero":funcionario.numero,
                    "complemento":funcionario.complemento,
                    "bairro":funcionario.bairro,
                    "cep":funcionario.cep,
                    "cidade":funcionario.cidade,
                    "estado":funcionario.estado,
                    "contato": funcionario.contato,
                    "email": funcionario.email,
                    "periodo": funcionario.periodo,
                    "regimeTrab": funcionario.regimeTrab,
                    "flagVet": funcionario.flagVet,
                    "crmv": funcionario.crmv,
                    "especialidade": funcionario.especialidade
                });
                funcionario.id = resultado.insertedId.toString();
    
            }catch(e){
                console.error(e);
            }
            finally{
                await this.funcionarioMongo.close();
            }    
        }
    }


    async atualizar(funcionario){
        if (funcionario instanceof Funcionario){
            try{
                await this.funcionarioMongo.connect();
                const identificador = new ObjectId(funcionario.id);
				const resultado = await this.funcionarioMongo.db(baseDados).collection(colecao)
                .updateOne({'_id':identificador}, {"$set":{
                    "nome":funcionario.nome,
                    "rg":funcionario.rg,
                    "cpf":funcionario.cpf,
                    "dtNasc":funcionario.dtNasc,
                    "endereco":funcionario.endereco,
                    "numero":funcionario.numero,
                    "complemento":funcionario.complemento,
                    "bairro":funcionario.bairro,
                    "cep":funcionario.cep,
                    "cidade":funcionario.cidade,
                    "estado":funcionario.estado,
                    "contato": funcionario.contato,
                    "email": funcionario.email,
                    "periodo": funcionario.periodo,
                    "regimeTrab": funcionario.regimeTrab,
                    "flagVet": funcionario.flagVet,
                    "crmv": funcionario.crmv,
                    "especialidade": funcionario.especialidade
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
                await this.funcionarioMongo.close();
            }
        }
    }


    async excluir(funcionario){
        if (funcionario instanceof Funcionario){
            try{
                await this.funcionarioMongo.connect();
                const identificador = new ObjectId(funcionario.id);
				const resultado = await this.funcionarioMongo.db(baseDados).collection(colecao)
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
                await this.funcionarioMongo.close();
            }
        }
    }


    async consultaPorId(id){
        try{
            await this.funcionarioMongo.connect();
            const identificador = new ObjectId(id);
            const resultado = await this.funcionarioMongo.db(baseDados).collection(colecao)
            .findOne({"_id":identificador});
            if (resultado){
                const funcionarioEncontrado = new Funcionario(
                resultado._id,
                resultado.nome,
                resultado.rg,
                resultado.cpf,
                resultado.dtNasc,
                resultado.endereco,
                resultado.numero,
                resultado.complemento,
                resultado.bairro,
                resultado.cep,
                resultado.cidade,
                resultado.estado,
                resultado.contato,
                resultado.email,
                resultado.periodo,
                resultado.regimeTrab,
                resultado.flagVet,
                resultado.crmv,
                resultado.especialidade);
                return funcionarioEncontrado;
            }
            
        }catch(e){
            console.error(e)
        }
        finally{
            await this.funcionarioMongo.close();
        }
    }

    async consultaPorNome(nome){
        try{
            await this.funcionarioMongo.connect();
            const cursor = this.funcionarioMongo.db(baseDados).collection(colecao)
            .find({"nome": {"$regex": nome}});
            const resultado = await cursor.toArray();
            let listaFuncionario = [];
            if (resultado){
                resultado.forEach((elemento) => {
                    const funcionario = new Funcionario(
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
                        elemento.email,
                        elemento.periodo,
                        elemento.regimeTrab,
                        elemento.flagVet,
                        elemento.crmv,
                        elemento.especialidade
                    )
                    listaFuncionario.push(funcionario)
                });
            }
            return listaFuncionario;

        }catch(e){
            console.error(e);
        }
        finally{
            await this.funcionarioMongo.close();
        }
    }
}