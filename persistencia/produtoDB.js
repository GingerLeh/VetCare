import { MongoClient, ObjectId } from 'mongodb';

import Produto from '../modelo/produto.js';

const uriBancoDados = "mongodb://localhost:27017";
const baseDados = 'VetCare';
const colecao = "Produtos";

export default class ProdutoDB {

    constructor() {
        this.clienteMongo = new MongoClient(uriBancoDados);
    }

    async incluir(produto) {
        if (produto instanceof Produto) {
            try {
                await this.clienteMongo.connect();
                let resultado = await this.clienteMongo.db(baseDados).collection(colecao)
                    .insertOne({
                        "descricao": produto.descricao,
                        "categoria": produto.categoria,
                        "dataValidade": produto.dataValidade,
                        "custoUnitario": produto.custoUnitario,
                        "margemLucro": produto.margemLucro,
                        "vendaControlada": produto.vendaControlada
                    });
                produto.id = resultado.insertedId.toString();
            }
            catch (e) {
                console.error(e);
            }
            finally {
                await this.clienteMongo.close();
            }
        }
    }

    async atualizar(produto) {
        if (produto instanceof Produto) {
            try {
                await this.clienteMongo.connect();
                const identificador = new ObjectId(produto.id);
                let resultado = await this.clienteMongo.db(baseDados).collection(colecao)
                    .updateOne({ '_id': identificador }, { "$set": { "descricao": produto.descricao, "categoria": produto.categoria, "dataValidade": produto.dataValidade, "custoUnitario": produto.custoUnitario, "margemLucro": produto.margemLucro, "vendaControlada": produto.vendaControlada } })
                if (resultado.modifiedCount > 0) {
                    return {
                        "resultado": true
                    }
                }
                else {
                    return {
                        "resultado": false
                    }
                }
            }
            catch (e) {
                console.error(e);
            }
            finally {
                await this.clienteMongo.close();
            }
        }
    }

    async excluir(produto) {
        if (produto instanceof Produto) {
            try {
                await this.clienteMongo.connect();
                const identificador = new ObjectId(produto.id);
                const resultado = await this.clienteMongo.db(baseDados).collection(colecao)
                    .deleteOne({ '_id': identificador })
                if (resultado.deletedCount > 0) {
                    return {
                        "resultado": true
                    }
                }
                else {
                    return {
                        "resultado": false
                    }
                }
            }
            catch (e) {
                console.error(e);
            }
            finally {
                await this.clienteMongo.close();
            }
        }
    }

    async consultarID(id) {
        try {
            await this.clienteMongo.connect();
            const identificador = new ObjectId(id);
            const resultadoBusca = this.clienteMongo.db(baseDados).collection(colecao)
                .findOne({ "_id": identificador });
            if (resultadoBusca) {
                const produtoBuscado = new Produto(resultadoBusca._id,
                    resultadoBusca.descricao,
                    resultadoBusca.categoria,
                    resultadoBusca.dataValidade,
                    resultadoBusca.custoUnitario,
                    resultadoBusca.margemLucro,
                    resultadoBusca.vendaControlada);
                return produtoBuscado;
            }
        }
        catch (e) {
            console.error(e);
        }
        finally {
            await this.clienteMongo.close();
        }
    }

    async consultarNome(descricao) {
        try {
            await this.clienteMongo.connect();
            const cursor = this.clienteMongo.db(baseDados).collection(colecao)
                .find({ "descricao": { "$regex": descricao } });
            const resultados = await cursor.toArray();
            let listaProdutos = [];
            if (resultados) {
                resultados.forEach((resultado) => {
                    const produto = new Produto(resultado._id,
                        resultado.descricao,
                        resultado.categoria,
                        resultado.dataValidade,
                        resultado.custoUnitario,
                        resultado.margemLucro,
                        resultado.vendaControlada);
                    listaProdutos.push(produto);
                });
            }
            return listaProdutos;
        }
        catch (e) {
            console.error(e);
        }
        finally {
            await this.clienteMongo.close();
        }
    }
}