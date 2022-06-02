var elementoMensagem = document.querySelector('[data-Mensagem]');
var botaoGravar = document.getElementById('botaoGravar');
var botaoAtualizar = document.getElementById('botaoAtualizar');
var botaoCancelar = document.getElementById('botaoCancelar');


botaoCancelar.addEventListener('click', ()=>{
    botaoAtualizar.disabled=true;
    botaoGravar.disabled=false;
});

//Exibindo os registros de Clientes se houver.
exibirTabelaClientes();

//Atribuindo a função ao elemento
botaoGravar.onclick = gravarCliente;

function dadosValidos(){
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const contato = document.getElementById('contato').value;

    if (nome && cpf && contato){
        
        return true;
    }
    else {
        return false;
    }
}

function gravarCliente(){
    if (dadosValidos()){
        const nome = document.getElementById('nome').value;
        const rg = document.getElementById('rg').value;
        const cpf = document.getElementById('cpf').value;
        const dtNasc = document.getElementById('dtNasc').value;
        const cep = document.getElementById('cep').value;
        const endereco = document.getElementById('endereco').value;
        const numero = document.getElementById('numero').value;
        const complemento = document.getElementById('complemento').value;
        const bairro = document.getElementById('bairro').value;
        const cidade = document.getElementById('cidade').value;
        const estado = document.getElementById('estado').value;
        const contato = document.getElementById('contato').value;
        const email = document.getElementById('email').value;
        const observacao = document.getElementById('observacao').value;
        const cliente = {
            "nome":nome,
            "rg":rg,
            "cpf":cpf,
            "dtNasc":dtNasc,
            "cep":cep,
            "endereco":endereco,
            "numero": numero,
            "complemento":complemento,
            "bairro":bairro,
            "cidade":cidade,
            "estado":estado,
            "contato":contato,
            "email":email,
            "observacao":observacao
        }
        //realizando a chamada assíncrona
        fetch('http://localhost:3000/clientes', {
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(cliente)
        }).then((resposta) => {
            if (resposta.ok){
                return resposta.json();
            }
            else {
                elementoMensagem.className="m-3 alert alert-warning";
                elementoMensagem.innerHTML="<p>Não foi possível processar uma resposta do servidor!</p>";
            }
        }).then((dados) => {
            document.getElementById('id').value=dados.id;
            elementoMensagem.className="m-3 alert alert-success";
            elementoMensagem.innerHTML="<p>"+ dados.status + " - id gerado: " + dados.id + "</p>";
            exibirTabelaClientes(); //exibimos novamente a tabela atualizada.
        }).catch((erro) => {
            elementoMensagem.className="m-3 alert alert-danger";
            elementoMensagem.innerHTML="<p> Problemas de comunicação com o servidor. ( " + erro.message +" )</p>";

        });
    }
    else {
        elementoMensagem.className="m-3 alert alert-warning";
        elementoMensagem.innerHTML="<p>Por favor, informe corretamente os dados do cliente.</p>";
    }
}


function exibirTabelaClientes(){
    fetch('http://localhost:3000/clientes', {
        method:"GET"
    }).then((resposta) => {
        if (resposta.ok){
            return resposta.json();
        }
    }).then((clientes) => {
        let elementoVisualizacaoTabela = document.querySelector('[data-Tabela]');
        elementoVisualizacaoTabela.innerHTML="";
        if (clientes.length == 0){
            elementoVisualizacaoTabela.innerHTML="<p>Não há clientes cadastrados!</p>";
        }
        else {
            let tabela = document.createElement('table');
            tabela.className="table table-striped table-hover";
            let cabecalho = document.createElement('thead');
            cabecalho.innerHTML="<tr>\
                                    <th>Id</th>\
                                    <th>Nome</th>\
                                    <th>Cidade</th>\
                                    <th>Contato</th>\
                                    <th>Pets</th>\
                                    <th>Ações</th>\
                                </tr>";
            tabela.appendChild(cabecalho);
            let corpo = document.createElement('tbody');
            for (const cliente of clientes){
                const linha = document.createElement('tr');
                linha.innerHTML="<td>" + cliente.id + "</td>\
                                 <td>" + cliente.nome + "</td>\
                                 <td>" + cliente.cidade + "</td>\
                                 <td>" + cliente.contato + "</td>\
                                 <td>" + estilizacaoExibicaoPets(cliente.pets).outerHTML + "</td>\
                                 <td>\
                                    <button type='button' class='btn btn-danger' onclick='excluirCliente(\"" + cliente.id +"\")'>\
                                        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-trash' viewBox='0 0 16 16'>\
                                            <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/>\
                                            <path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/>\
                                        </svg>\
                                    </button>\
                                    <button type='button' class='btn btn-warning' id='editar' onclick='alterarTelaPut(\"" + cliente.id + "\")'>\
                                        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-pencil' viewBox='0 0 16 16'>\
                                            <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z'/>\
                                        </svg>\
                                    </button>\
                                 </td>";
                corpo.appendChild(linha);                        
            }
            let rodape = document.createElement('tfoot');
            rodape.innerHTML="<tr>\
                                <td colspan='3'>Quantidade de clientes :</td>\
                                <td colspan='3'>"+ clientes.length + "</td>\
                              </tr>";
            tabela.appendChild(corpo);
            tabela.appendChild(rodape);
            elementoVisualizacaoTabela.appendChild(tabela);
        }
    });
}


function estilizacaoExibicaoPets(listaPets){
    let divDropdown = document.createElement("div");
    divDropdown.className="btn-group"; //classe do bootstrap 5
    divDropdown.innerHTML='<button type="button" class="btn btn-info dropdown-toggle" data-bs-toggle="dropdown"\
     aria-expanded="false">Pets</button>';
    let lista = document.createElement('ul');
    lista.className="dropdown-menu";
    for (const pet of listaPets){
        let itemLista = document.createElement('li');
        itemLista.innerHTML='<a class="dropdowm-item" href="#">' + pet.nome + " -> " + pet.especie + '</a>';
        lista.appendChild(itemLista);
    }
    let butAdd = document.createElement('button');
    butAdd.innerText="+ Pet";    
    lista.appendChild(butAdd);
    divDropdown.appendChild(lista);
    return divDropdown;
}


function alterarTelaPut(id){
    fetch('http://localhost:3000/clientes/' + id, {
        method:"GET"
    }).then((resposta) => {
        if (resposta.ok){
            return resposta.json();
        }
        else{
            elementoMensagem.className = "m-3 alert alert-warning";
            elementoMensagem.innerHTML="<p>Registro não encontrado!</p>";
        }
    }).then((cliente) => {

        for (const [chave, valor] of cliente){
            document.getElementById(chave).value=valor;
        }
        botaoGravar.disabled=true;
        botaoAtualizar.disabled=false;
        botaoAtualizar.addEventListener("click", ()=> {
            atualizarCliente(id);
        });
    });
}


function atualizarCliente(id){
    if (dadosValidos()){
        const nome = document.getElementById('nome').value;
        const rg = document.getElementById('rg').value;
        const cpf = document.getElementById('cpf').value;
        const dtNasc = document.getElementById('dtNasc').value;
        const cep = document.getElementById('cep').value;
        const endereco = document.getElementById('endereco').value;
        const numero = document.getElementById('numero').value;
        const complemento = document.getElementById('complemento').value;
        const bairro = document.getElementById('bairro').value;
        const cidade = document.getElementById('cidade').value;
        const estado = document.getElementById('estado').value;
        const contato = document.getElementById('contato').value;
        const email = document.getElementById('email').value;
        const observacao = document.getElementById('observacao').value;
        const cliente = {
            "nome":nome,
            "rg":rg,
            "cpf":cpf,
            "dtNasc":dtNasc,
            "cep":cep,
            "endereco":endereco,
            "numero": numero,
            "complemento":complemento,
            "bairro":bairro,
            "cidade":cidade,
            "estado":estado,
            "contato":contato,
            "email":email,
            "observacao":observacao
        }
        fetch('http://localhost:3000/clientes/' + id, {
            method:"PUT",
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(cliente)
        }).then((resposta) => {
            if (resposta.ok){
                return resposta.json();
            }
            else{
                elementoMensagem.className = "m-3 alert alert-warning";
                elementoMensagem.innerHTML = "<p>Desculpe, não foi possível atualizar este registro!</p>";
        }
        }).then((retorno) => {
            if (retorno.status){
                exibirTabelaClientes();
                elementoMensagem="m-3 alert alert-success";
                elementoMensagem="<p>Registro atualizado com sucesso!</p>";
                document.getElementById('id').value="";
                for (const [chave] of cliente){
                    document.getElementById(chave).value="";
                }
                botaoAtualizar.disabled=true;
                botaoGravar.disabled=false;
            }
        }).catch((erro) =>{
            elementoMensagem.className="m-3 - alert alert-warning";
            elementoMensagem.innerHTML="<p>Não foi possivel processar esta requisição no servidor! </br>" + erro + " </p>";
        });
    }    
    else {
        elementoMensagem.className="btn btn-warning";
        elementoMensagem.innerHTML="<p>Dados inválidos!</p>";
    }
}


function excluirCliente(id){
    fetch('http://localhost:3000/clientes/' + id,  {
        method:"DELETE"
    }).then((resposta) => {
        if (resposta.ok){
            return resposta.json();
        }
        else{
            elementoMensagem.className = "m-3 alert alert-warning";
            elementoMensagem.innerHTML="<p>Não foi possível excluir o cliente!</p>";
        }
    }).then((retorno) => {
        if (retorno.status){
            exibirTabelaClientes();
            elementoMensagem.className = "m-3 alert alert-success";
            elementoMensagem.innerHTML="<p> "+ retorno.status + "- Registro apagado com sucesso!</p>";
        }
    }).catch((erro) => {
        elementoMensagem.className="m-3 alert alert-warning";
        elementoMensagem.innerHTML="<p>Não foi possível enviar a requisição de exclusão para o servidor!</p>";
    });
}
