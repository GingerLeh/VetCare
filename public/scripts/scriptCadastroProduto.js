var elementoMensagem = document.querySelector('[data-Mensagem]');
var botaoAdicionar = document.getElementById("botaoAdicionar");

botaoAdicionar.onclick = adicionarProduto;
exibirTabelaProdutos();

function dadosValidos() {
    const descricao = document.getElementById("descricao").value;
    const categoria = document.getElementById("categoria").value;
    const dataValidade = document.getElementById("dataValidade").value;
    const custoUnitario = document.getElementById("custoUnitario").value;
    const margemLucro = document.getElementById("margemLucro").value;
    const vendaControlada = document.getElementById("vendaControlada").value;

    //pseudo validação
    if (descricao && categoria && dataValidade && custoUnitario && margemLucro)
        return true;
    else
        return false;
}

function adicionarProduto() {
    if (dadosValidos()) {
        const descricao = document.getElementById("descricao").value;
        const categoria = document.getElementById("categoria").value;
        const dataValidade = document.getElementById("dataValidade").value;
        const custoUnitario = document.getElementById("custoUnitario").value;
        const margemLucro = document.getElementById("margemLucro").value;
        const vendaControlada = document.getElementById("vendaControlada").value;
        const produto = {
            "descricao": descricao,
            "categoria": categoria,
            "dataValidade": dataValidade,
            "custoUnitario": custoUnitario,
            "margemLucro": margemLucro,
            "vendaControlada": vendaControlada
        }
        //chamada assincrona
        fetch('http://localhost:3000/produtos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto)
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
        elementoMensagem.innerHTML = "<p>Por favor, informe corretamente os dados do Produto.</p>";
    }
}

function exibirTabelaProdutos() {
    fetch('http://localhost:3000/produtos', {
        method: 'GET'
    }).then((resposta) => {
        if (resposta.ok) {
            return resposta.json();
        }
    }).then((produtos) => {
        elementoVisualizacaoTabela = document.querySelector('[data-Tabela]');
        elementoVisualizacaoTabela.innerHTML = " ";
        if (produtos.length == 0)
            elementoVisualizacaoTabela.innerHTML = "<p>Não há produtos cadastrados!</p>";
        else {
            let tabela = document.createElement('table');
            tabela.className = "table table-striped table-hover";

            let cabecalho = document.createElement('thead');
            cabecalho.innerHTML = "<tr>\
                                    <th>ID</th>\
                                    <th>Descrição</th>\
                                    <th>Categoria</th>\
                                    <th>Data de Validade</th>\
                                    <th>Custo Unitário</th>\
                                    <th>Margem de Lucro</th>\
                                    <th>Venda Controlada</th>\
                                    </tr>"
            tabela.appendChild(cabecalho);
            let corpo = document.createElement('tbody');

            for (const produto of produtos) {
                const linha = document.createElement('tr');
                linha.innerHTML = "<td>" + produto.id + "</td>" +
                    "<td>" + produto.descricao + "</td>" +
                    "<td>" + produto.categoria + "</td>" +
                    "<td>" + produto.dataValidade + "</td>" +
                    "<td>" + produto.custoUnitario + "</td>" +
                    "<td>" + produto.margemLucro + "</td>" +
                    "<td>" + produto.vendaControlada + "</td>" +
                    "<td>\
                        <button type='button'class='btn btn-danger' onclick='excluirProduto(\"" + produto.id + "\")'>\
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

function excluirProduto(id) {
    fetch('http://localhost:3000/produtos/' + id, {
        method: 'DELETE'
    }).then((resposta) => {
        if (resposta.ok) {
            return resposta.json();
        }
        else {
            elementoMensagem.className = " m-3 alert alert-warning";
            elementoMensagem.innerHTML = "<p>Não foi possível excluir o Produto.</p>";
        }
    }).then((retorno) => {
        elementoMensagem.className = " m-3 alert alert-warning";
        elementoMensagem.innerHTML = "<p>Produto excluído com sucesso!</p>";
        exibirTabelaProdutos();
    }).catch((erro) => {
        elementoMensagem.className = " m-3 alert alert-warning";
        elementoMensagem.innerHTML = "<p>" + erro.message + "</p>";
    });
}