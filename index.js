//importações
import http from "http";
import express from "express";
import rotaCliente from "./rotas/rotaClientes.js";

const hostname = "localhost";
const porta = 3000;

const app = express();
app.use(express.static('./public'));
//Rota Clientes - Junior
app.use('/clientes', rotaCliente);

const servidor = http.createServer(app);

servidor.listen(porta, hostname, () => {
    console.log("Servidor rodando em http://%s:%d", hostname, porta);
});