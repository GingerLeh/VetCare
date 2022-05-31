//importações
import http from "http";
import express from "express";
import rotaProduto from "./rotas/rotaProdutos.js";
import cors from 'cors';
import rotaFuncionario from "./rotas/rotaFuncionario.js";

const hostname = "localhost";
const porta = 3000;

const app = express();

//app.use(express.static('./public'));

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

//Rota Produtos - Flavia
app.use('/produtos', rotaProduto);
//Rota Funcionarios - Alessa
app.use('/funcionario',rotaFuncionario);

const servidor = http.createServer(app);

servidor.listen(porta, hostname, () => {
    console.log("Servidor rodando em http://%s:%d", hostname, porta);
});

