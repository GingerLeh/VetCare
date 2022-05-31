var elementoMensagem = document.querySelector('[data-Mensagem]');
var botaoAdicionar = document.getElementById("botaoAdicionar");

botaoAdicionar.onclick = adicionarFuncionario;
exibirTabelaFuncionarios();

function dadosValidos() {
    const nome = document.getElementById("nome").value;
    const rg = document.getElementById("rg").value;
    const cpf = document.getElementById("cpf").value;
    const dtNasc = document.getElementById("dtNasc").value;
    const endereco = document.getElementById("endereco").value;
    const numero = document.getElementById("numero").value;
    const complemento = document.getElementById("complemento").value;
    const bairro = document.getElementById("bairro").value;
    const cep = document.getElementById("cep").value;
    const cidade = document.getElementById("cidade").value;
    const estado = document.getElementById("estado").value;
    const contato = document.getElementById("contato").value;
    const email = document.getElementById("email").value;
    const periodo = document.getElementById("periodo").value;
    const regimeTrab = document.getElementById("regimeTrab").value;
    const flagVet = document.getElementById("flagVet").value;
    const crmv = document.getElementById("crmv").value;
    const especialidade = document.getElementById("especialidade").value;


    //pseudo validação
    if (nome && rg && cpf && dtNasc && endereco && numero && bairro && cep && cidade && estado &&
        contato && email && periodo && regimeTrab)
        return true;
    else
        return false;
}

function adicionarFuncionario() {
    if (dadosValidos()) {
        const nome = document.getElementById("nome").value;
        const rg = document.getElementById("rg").value;
        const cpf = document.getElementById("cpf").value;
        const dtNasc = document.getElementById("dtNasc").value;
        const endereco = document.getElementById("endereco").value;
        const numero = document.getElementById("numero").value;
        const complemento = document.getElementById("complemento").value;
        const bairro = document.getElementById("bairro").value;
        const cep = document.getElementById("cep").value;
        const cidade = document.getElementById("cidade").value;
        const estado = document.getElementById("estado").value;
        const contato = document.getElementById("contato").value;
        const email = document.getElementById("email").value;
        const periodo = document.getElementById("periodo").value;
        const regimeTrab = document.getElementById("regimeTrab").value;
        const flagVet = document.getElementById("flagVet").value;
        const crmv = document.getElementById("crmv").value;
        const especialidade = document.getElementById("especialidade").value;
        const funcionario = {
            "nome": nome,
            "rg": rg,
            "cpf": cpf,
            "dtNasc": dtNasc,
            "endereco": endereco,
            "numero,": numero,
            "complemento": complemento,
            "bairro": bairro,
            "cep": cep,
            "cidade": cidade,
            "estado": estado,
            "contato": contato,
            "email": email,
            "periodo": periodo,
            "regimeTrab": regimeTrab,
            "flagVet": flagVet,
            "crmv": crmv,
            "especialidade": especialidade
        }
        //chamada assincrona
        fetch('http://localhost:3000/funcionarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(funcionario)
        }).then((resposta) => { // comando fetch recebe uma resposta do servidor.
            if (resposta.ok) {
                return resposta.json();
            }
            else {
                elementoMensagem.className = " m-3 alert alert-warning";
                elementoMensagem.innerHTML = "<p>Não foi possível processar a resposta vinda do servidor.</p>";
            }
        }).then((dados) => { //recebendo a resposta.json
            elementoMensagem.className = " m-3 alert alert-warning";
            elementoMensagem.innerHTML = "<p>" + dados.status + " - Gerado o id " + dados.id + "</p>";
            exibirTabelaProdutos();
        }).catch((erro) => { //fim da chamada fetch. Nesse caso, ocorre um erro fora do alcance do programador.
            elementoMensagem.className = " m-3 alert alert-danger";
            elementoMensagem.innerHTML = "<p>" + "Problema de comunicação com o servidor (" + erro.message + ")</p>";
        })
    }
    else {
        elementoMensagem.className = " m-3 alert alert-warning";
        elementoMensagem.innerHTML = "<p>Por favor, informe corretamente os dados do Funcionário.</p>";
    }
}

function exibirTabelaFuncionarios() {
    fetch('http://localhost:3000/funcionarios', {
        method: 'GET'
    }).then((resposta) => {
        if (resposta.ok) {
            return resposta.json();
        }
    }).then((funcionarios) => {
        elementoVisualizacaoTabela = document.querySelector('[data-Tabela]');
        elementoVisualizacaoTabela.innerHTML = " ";
        if (produtos.length == 0)
            elementoVisualizacaoTabela.innerHTML = "<p>Não há funcionários cadastrados!</p>";
        else {
            let tabela = document.createElement('table');
            tabela.className = "table table-striped table-hover";

            let cabecalho = document.createElement('thead');
            cabecalho.innerHTML = "<tr>\
                                    <th>Nome</th>\
                                    <th>RG</th>\
                                    <th>CPF</th>\
                                    <th>Data de Nascimento</th>\
                                    <th>Endereço</th>\
                                    <th>Número</th>\
                                    <th>Complemento</th>\
                                    <th>Bairro</th>\
                                    <th>CEP</th>\
                                    <th>Cidade</th>\
                                    <th>Estado</th>\
                                    <th>Contato</th>\
                                    <th>E-mail</th>\
                                    <th>Período</th>\
                                    <th>Regime de Trabalho</th>\
                                    <th>Veterinário</th>\
                                    <th>CRMV</th>\
                                    <th>Especialidade</th>\
                                    </tr>"
            tabela.appendChild(cabecalho);
            let corpo = document.createElement('tbody');

            for (const funcionario of funcionarios) {
                const linha = document.createElement('tr');
                linha.innerHTML = "<td>" + funcionario.id + "</td>" +
                    "<td>" + funcionario.nome + "</td>" +
                    "<td>" + funcionario.rg + "</td>" +
                    "<td>" + funcionario.cpf + "</td>" +
                    "<td>" + funcionario.dtNasc + "</td>" +
                    "<td>" + funcionario.endereco + "</td>" +
                    "<td>" + funcionario.numero + "</td>" +
                    "<td>" + funcionario.complemento + "</td>" +
                    "<td>" + funcionario.bairro + "</td>" +
                    "<td>" + funcionario.cep + "</td>" +
                    "<td>" + funcionario.cidade + "</td>" +
                    "<td>" + funcionario.estado + "</td>" +
                    "<td>" + funcionario.contato + "</td>" +
                    "<td>" + funcionario.email + "</td>" +
                    "<td>" + funcionario.periodo + "</td>" +
                    "<td>" + funcionario.regimeTrab + "</td>" +
                    "<td>" + funcionario.flagVet + "</td>" +
                    "<td>" + funcionario.crmv + "</td>" +
                    "<td>" + funcionario.especialidade + "</td>" +
                    "<td>\
                        <button type='button'class='btn btn-danger' onclick='excluirFuncionario(\"" + funcionario.id + "\")'>\
                            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-trash' viewBox='0 0 16 16'>\
                                <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/>\
                                <path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/>\
                            </svg>\
                        </button>\
                        <button type='button'class='btn btn-warning'>\
                            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-pencil' viewBox='0 0 16 16'> \
                                <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z'/>\
                            </svg>\
                        </button>\
                    </td>";
                corpo.appendChild(linha);
            }
            tabela.appendChild(corpo);
            elementoVisualizacaoTabela.appendChild(tabela);
        }
    });
}

function excluirFuncionario(id) {
    fetch('http://localhost:3000/funcionarios/' + id, {
        method: 'DELETE'
    }).then((resposta) => {
        if (resposta.ok) {
            return resposta.json();
        }
        else {
            elementoMensagem.className = " m-3 alert alert-warning";
            elementoMensagem.innerHTML = "<p>Não foi possível excluir o Funcionário.</p>";
        }
    }).then((retorno) => {
        elementoMensagem.className = " m-3 alert alert-warning";
        elementoMensagem.innerHTML = "<p>Funcionário escluído com sucesso!</p>";
        exibirTabelaFuncionarios();
    }).catch((erro) => {
        elementoMensagem.className = " m-3 alert alert-warning";
        elementoMensagem.innerHTML = "<p>" + erro.message + "</p>";
    });
}