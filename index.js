//importações
import http from "http";
import express from "express";
import rotaFuncionario from "./rotas/rotaFuncionario.js";

const hostname = "localhost";
const porta = 3000;

const app = express();

//Rota Funcionarios - Junior
app.use('/funcionario',rotaFuncionario);

const servidor = http.createServer(app);

servidor.listen(porta, hostname, () => {
    console.log("Servidor rodando em http://%s:%d", hostname, porta);
});