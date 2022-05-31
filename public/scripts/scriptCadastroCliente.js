var elementoMensagem = document.querySelector('[data-Mensagem]');
var botaoGravar = document.getElementById("botaoGravar");

botaoGravar.onclick = gravarCliente;

function dadosValidos() {
    const cpf = document.getElementById("cpf").value;
    const nome = document.getElementById("nome").value;
    const cidade = document.getElementById("cidade").value;


    //pseudo validação
    if (cpf && nome && cidade)
        return true;
    else
        return false;
}

function gravarCliente() {
    if (dadosValidos()) {
        const cpf = document.getElementById("cpf").value;
        const nome = document.getElementById("nome").value;
        const cidade = document.getElementById("cidade").value;
        const cliente = {
            "cpf": cpf,
            "nome": nome,
            "cidade": cidade
        }
        //chamada assincrona
        fetch('http://localhost:3000/clientes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cliente)
        }).then((resposta) => { // comando fetch recebe uma resposta do servidor.
            if (resposta.ok) {
                return resposta.json()
            }
            else {
                elementoMensagem.className = " m-3 alert alert-warning";
                elementoMensagem.innerHTML = "<p>Não foi possível processar a resposta vinda do servidor.</p>";
            }
        }).then((dados) => { //recebendo a resposta.json
            elementoMensagem.className = " m-3 alert alert-warning";
            elementoMensagem.innerHTML = "<p>" + dados.status + " - Gerado o id " + dados.id + "</p>";
        }).catch((erro) => { //fim da chamada fetch. Nesse caso, ocorre um erro fora do alcance do programador.
            elementoMensagem.className = " m-3 alert alert-danger";
            elementoMensagem.innerHTML = "<p>" + "Problema de comunicação com o servidor (" + erro.message + ")</p>";
        })
    }
    else {
        elementoMensagem.className = " m-3 alert alert-warning";
        elementoMensagem.innerHTML = "<p>Por favor, informe corretamente os dados do Cliente.</p>";
    }
}