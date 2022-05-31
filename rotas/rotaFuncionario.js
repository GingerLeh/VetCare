import express from "express";
import FuncionarioDB from "../persistencia/funcionarioDB.js";
import Funcionario from "../modelo/funcionario.js";

const rotaFuncionario = express.Router();

rotaFuncionario.use(express.json());

const funcionarioDB = new FuncionarioDB();
rotaFuncionario.route('/:id?')
.get((req, resp) => {
    if (req.params.id){
        funcionarioDB.consultaPorId(req.params.id).then((funcionario)=>{
            resp.statusCode=200;
            resp.setHeader("Content-Type","application/json");
            resp.json(funcionario.toJSON());
        });
    }
    else {
        funcionarioDB.consultaPorNome("").then((funcionarios) =>{
            resp.statusCode = 200;
            resp.setHeader("Content-Type","application/json");
            resp.json(funcionarios.map((funcionario) => {
                return funcionario.toJSON();
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
            const funcionario = new Funcionario(0, dados.nome, dados.rg, dados.cpf, dados.dtNasc, dados.endereco,
                dados.numero, dados.complemento, dados.bairro, dados.cep, dados.cidade, dados.estado,
                dados.contato,dados.email,dados.periodo,dados.regimeTrab,dados.flagVet,dados.crmv,dados.especialidade); 
            funcionarioDB.incluir(funcionario).then(() => {
                resp.statusCode = 200;
                resp.setHeader("Content-Type", "application/json");
                resp.json({
                    "status": "200 - incluído com sucesso!",
                    "id": funcionario.id
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
            const funcionario = new Funcionario(req.params.id, dados.nome, dados.rg, dados.cpf, dados.dtNasc,
                dados.endereco, dados.numero, dados.complemento, dados.bairro, dados.cep, dados.cidade,
                dados.estado,dados.contato,dados.email,dados.periodo,dados.regimeTrab,dados.flagVet,dados.crmv,dados.especialidade);
            funcionarioDB.atualizar(funcionario).then((resultado) => {
                resp.statusCode = 200;
                resp.setHeader("Content-Type", "application/json");
                resp.json({
                    "status": "200 - Sucesso!",
                    "mensagem": "Funcionário atualizado com sucesso!"
                });
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
            "mensagem": "Para atualizar um funcionario, informe o id do funcionario na url."
        });
    }
})
.delete((req, resp) => {
    if (req.params.id){
        const funcionario = new Funcionario(req.params.id, "", "", "", "", "",
        "", "", "", "", "", "", "","","","","","","","");
        funcionarioDB.excluir(funcionario).then((resultado) => {
            resp.statusCode = 200;
            resp.setHeader("Content-Type","application/json");
            resp.json({
                "status": "200 - Sucesso!",
                "mensagem": "Funcionário deletado com sucesso!"
            });
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

export default rotaFuncionario;