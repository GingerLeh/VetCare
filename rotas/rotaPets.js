import  express from "express";
import PetDB from "../persistencia/petDB.js";
import Pet from "../modelo/pets.js";

const rotaPets = express.Router();
//Permite que dados no formato json sejam recuperados da requisição usando o comando req.body
rotaPets.use(express.json());
const petDB = new PetDB();


rotaPets.route('/:id?')// ? - id é facultativo
.get((req, resp) => {
    if (req.params.id)
    {
        petDB.consultarPorID(req.params.id).then((pet) => {
            resp.statusCode = 200;
            resp.setHeader("Content-Type", "application/json"); 
            resp.json(pet.toJSON());
        });
    }
    else{
        petDB.consultarPeloNome("").then((pets) => {
            /*resp.statusCode = 200;
            resp.setHeader("Content-Type", "application/json");
            let listaPetsJSON = [];
            for (let i=0; i <= pets.length; i++){
                listaPetsJSON.push(pets[i].toJSON);
            }
            resp.json(listaPetsJSON);*/
            resp.json(pets.map((pet) => {
               return pet.toJSON();
            }));
        });
    }
})
.post((req, resp) =>{
    if (req.params.id){
        //Quem vai gerar o identificador id é o MongoDB
        resp.statusCode = 405;
        resp.setHeader("Content-Type", "application/json");
        resp.json({
            "status":"405 - Não permitido", 
            "mensagem": "Para cadastrar um pet, não se deve informar um id"
        });
    }else{
        const dados = req.body;
        const nome = dados.nome;
        const raca = dados.raca;
        const peso = dados.peso;
        const dataNascimento = dados.dataNascimento;
        const porte = dados.porte;
        if (nome && raca && peso && dataNascimento && porte){
            const pet = new Pet(0, nome, raca, peso, dataNascimento, porte);
            petDB.incluir(pet).then(() => {
                resp.statusCode = 200;
                resp.setHeader("Content-Type", "application/json");
                resp.json({
                    "status":"200 - incluído com sucesso!",
                    "id": pet.id
                })
            });
        }else{
            resp.statusCode = 405;
            resp.setHeader("Content-Type", "application/json");
            resp.json({
                "status":"405 - Não permitido", 
                "mensagem": "Para cadastrar um pet, informe corretamente os dados via objeto Json"
            });
        }
    }
    
})
.put((req, resp) =>{
    if(req.params.id){
        const dados = req.body;
        const nome = dados.nome;
        const raca = dados.raca;
        const peso = dados.peso;
        const dataNascimento = dados.dataNascimento;
        const porte = dados.porte;
        if (nome && raca && peso && dataNascimento && porte){ //pseudo validacao
            const pet = new Pet(req.params.id, nome, raca, peso, dataNascimento, porte);
            petDB.atualizar(pet).then((resultado) =>{
                resp.statusCode = 200;
                resp.setHeader("Content-Type", "application/json");
                resp.json(resultado);
            });
        }
        else{
            resp.statusCode = 405;
            resp.setHeader("Content-Type", "application/json");
            resp.json({
                "status":"405 - Não permitido", 
                "mensagem": "Para atualizar um pet, informe corretamente os dados via objeto Json"
            });
        }
    }
    else{
        resp.statusCode = 405; //método não permitido
        resp.setHeader("Content-Type", "application/json");
        resp.json({
            "status":"FALHA",
            "mensagem": "Especifique o pet que deseja atualizar!"
        });
    }
})

.delete((req, resp) => {
    resp.statusCode = 200;
    resp.setHeader("Content-Type", "application/json");
    if(req.params.id){
       const pet = new Pet(req.params.id, "", "", "", "", "");
       petDB.excluir(pet).then((resultado) => {
        resp.statusCode = 200;
        resp.setHeader("Content-Type", "application/json");
        resp.json(resultado);
       } )
    }
    else{
        resp.statusCode = 405; //método não permitido
        resp.setHeader("Content-Type", "application/json");
        resp.json({
            "status":"FALHA",
            "mensagem": "Especifique o pet que deseja excluir!"
        });
    }
});

export default rotaPets;