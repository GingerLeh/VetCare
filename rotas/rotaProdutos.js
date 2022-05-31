import express from 'express';
import ProdutoDB from '../persistencia/produtoDB.js';
import Produto from '../modelo/produto.js';

const rotaProduto = express.Router();
rotaProduto.use(express.json()); // permite que dados no formato JSON sejam recuperados da requisição usando comando req.body 
const produtoDB = new ProdutoDB();

rotaProduto.route('/:id?')
    .get((req, resp) => {
        if (req.params.id) {
            produtoDB.consultarID(req.params.id).then((produto) => {
                resp.statusCode = 200;
                resp.setHeader("Content-Type", "application/json");
                resp.json(produto.toJSON());
            });
        }
        else {
            produtoDB.consultarNome("").then((produtos) => {
                resp.statusCode = 200;
                resp.setHeader("Content-Type", "application/json");
                resp.json(produtos.map((produto) => {
                    return produto.toJSON();
                }));
            })
        }
    })


    .post((req, resp) => {
        if (req.params.id) {
            resp.statusCode = 405;
            resp.setHeader("Content-Type", "application/json");
            resp.json({
                "status": "405 - não permitido",
                "mensagem": "Para cadastrar um produto, não se deve informar um id na url!"
            });
        }
        else {
            const dados = req.body;
            const descricao = dados.descricao;
            const categoria = dados.categoria;
            const dataValidade = dados.dataValidade;
            const custoUnitario = dados.custoUnitario;
            const margemLucro = dados.margemLucro;
            const vendaControlada = dados.vendaControlada;

            if (descricao && categoria && dataValidade && custoUnitario
                && margemLucro && vendaControlada) {
                const produto = new Produto(0, descricao, categoria, dataValidade,
                    custoUnitario, margemLucro, vendaControlada);
                produtoDB.incluir(produto).then(() => {
                    resp.statusCode = 200;
                    resp.setHeader("Content-Type", "application/json");
                    resp.json({
                        "status": "200 - Incluído com sucesso.",
                        "id": produto.id
                    })
                });
            }
            else {
                resp.statusCode = 405;
                resp.setHeader("Content-Type", "application/json");
                resp.json
                    ({
                        "status": "405 - não permitido.",
                        "mensagem": "Para cadastrar um produto, informe corretamente a descricao, categoria, dataValidade, custoUnitario, margemLucro e vendaControlada via objeto JSON!"
                    });
            }
        }
    })

    .put((req, resp) => {
        if (req.params.id) {
            const dados = req.body;
            const descricao = dados.descricao;
            const categoria = dados.categoria;
            const dataValidade = dados.dataValidade;
            const custoUnitario = dados.custoUnitario;
            const margemLucro = dados.margemLucro;
            const vendaControlada = dados.vendaControlada;

            if (descricao && categoria && dataValidade && custoUnitario
                && margemLucro && vendaControlada) {
                const produto = new Produto(req.params.id, descricao, categoria, dataValidade, custoUnitario, margemLucro, vendaControlada);

                produtoDB.atualizar(produto).then((resultado) => {
                    resp.statusCode = 200;
                    resp.setHeader("Content-Type", "application/json");
                    resp.json(resultado);
                });
            }
            else {
                resp.statusCode = 405;
                resp.setHeader("Content-Type", "application/json");
                resp.json
                    ({
                        "status": "405 - não permitido",
                        "mensagem": "Para atualizar um produto, informe corretamente a descricao, categoria, dataValidade, custoUnitario, margemLucro e vendaControlada via objeto JSON!"
                    });
            }
        }
        else {
            resp.statusCode = 200;
            resp.setHeader("Content-Type", "text/html");
            resp.json
                ({
                    "status": "405 - não permitido",
                    "mensagem": "Para atualizar um produto, informe o id na url de requisição!"
                });
        }
    })

    .delete((req, resp) => {
        if (req.params.id) {
            const produto = new Produto(req.params.id, "", "", "");
            produtoDB.excluir(produto).then((resultado) => {
                resp.statusCode = 200;
                resp.setHeader("Content-Type", "application/json");
                resp.json(resultado);
            });
        }
        else {
            resp.statusCode = 405;
            resp.setHeader("Content-Type", "application/json");
            resp.json
                ({
                    "status": "405 - não permitido",
                    "mensagem": "Para excluir um produto, informe corretamente o id na url de  requisição!"
                });
        }
    });

export default rotaProduto;