//importações
import http from "http";
import express from "express";
<<<<<<< HEAD
import rotaProduto from "./rotas/rotaProdutos.js";
import cors from 'cors';
import rotaFuncionario from "./rotas/rotaFuncionario.js";
=======
import rotaCliente from "./rotas/rotaClientes.js";
>>>>>>> 9e48cf2269e390755169183bec461d5537754ed6

const hostname = "localhost";
const porta = 3000;

const app = express();

<<<<<<< HEAD
//app.use(express.static('./public'));

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

//Rota Produtos - Flavia
app.use('/produtos', rotaProduto);
//Rota Funcionarios - Alessa
app.use('/funcionario',rotaFuncionario);
=======
//Rota Clientes - Junior
app.use('/clientes', rotaCliente);
>>>>>>> 9e48cf2269e390755169183bec461d5537754ed6

const servidor = http.createServer(app);

servidor.listen(porta, hostname, () => {
    console.log("Servidor rodando em http://%s:%d", hostname, porta);
});