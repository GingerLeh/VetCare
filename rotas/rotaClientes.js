import express from "express";
import ClienteDB from "../persistencia/clienteDB.js";
import Cliente from "../modelo/cliente.js";

const rotaCliente = express.Router();

rotaCliente.use(express.json());

const clienteDB = new ClienteDB();
rotaCliente.route('/:id?')
.get((req, resp) => {
    if (req.params.id){
        clienteDB.consultaPorId(req.params.id).then((cliente)=>{
            resp.statusCode=200;
            resp.setHeader("Content-Type","application/json");
            resp.json(cliente.toJSON());
        });
    }
    else {
        clienteDB.consultaPorNome("").then((clientes) =>{
            resp.statusCode = 200;
            resp.setHeader("Content-Type","application/json");
            resp.json(clientes.map((cliente) => {
                return cliente.toJSON();
            }));
        })
    }
})
.post((req, resp) => {
    if (req.params.id){
        resp.statusCode = 405;
        resp.setHeader("Content-Type","application/json");
        resp.json({
            "status":"405 - Não permitido!",
            "mensagem":"Não especifique id para um novo registro."
        });
    }
    else {
        const dados = req.body;
        if (dados.nome && dados.rg && dados.cpf && dados.contato){
            const cliente = new Cliente(0, dados.nome, dados.rg, dados.cpf, dados.dtNasc, dados.cep,
                dados.endereço, dados.numero, dados.complemento, dados.bairro, dados.cidade, dados.estado,
                dados.email, dados.contato, dados.observacao, []); 
            clienteDB.incluir(cliente).then(() => {
                resp.statusCode = 200;
                resp.setHeader("Content-Type", "application/json");
                resp.json({
                    "status": "200 - incluído com sucesso!",
                    "id": cliente.id
                });   
            });
        }
        else {
            resp.statusCode = 405;
            resp.setHeader("Content-Type","application/json");
            resp.json({
                "status":"405 - Não permitido!",
                "mensagem": "É necessário preencher os campos corretamente."
            });          
        }
    }
})
.put((req, resp) => {
    if (req.params.id){
        const dados = req.body;
        if (dados.nome && dados.rg && dados.cpf && dados.contato){
            const cliente = new Cliente(req.params.id, dados.nome, dados.rg, dados.cpf, dados.dtNasc,
                dados.cep, dados.endereco, dados.numero, dados.complemento, dados.bairro, dados.cidade,
                dados.estado, dados.email, dados.contato, dados.obsevacao, []);
            clienteDB.atualizar(cliente).then((resultado) => {
                resp.statusCode = 200;
                resp.setHeader("Content-Type", "application/json");
                resp.json(resultado);
            });
        }
        else{
            resp.statusCode = 405;
            resp.setHeader("Content-Type", "application/json");
            resp.json({
                "status": "405 - Não permitido!",
                "mensagem": "Preencha todos os campos necessários!"
            });
        }
    }    
    else{
        resp.statusCode = 405;
        resp.setHeader("Content-Type","application/json");
        resp.json({
            "status" : "405 - Não permitido.",
            "mensagem": "Para atualizar um cliente, informe o id do cliente na url."
        });
    }
})
.delete((req, resp) => {
    if (req.params.id){
        const cliente = new Cliente(req.params.id, "", "", "", "", "",
        "", "", "", "", "", "", "", "", "[]");
        clienteDB.excluir(cliente).then((resultado) => {
            resp.statusCode = 200;
            resp.setHeader("Content-Type","application/json");
            resp.json(resultado);
        });
    }
    else{
        resp.statusCode = 405;
        resp.setHeader("Content-Type","application/json");
        resp.json({
            "status" : "405 - Não permitido!",
            "mensagem" : "Não é permitido a exclusão sem definir o id na url de requisição."
        });
    }    
});

export default rotaCliente;