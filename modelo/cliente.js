//Classe para modelar cliente - Junior

export default class Cliente{
    //Atributos da classe
    #id;
    #nome;
    #rg;
    #cpf;
    #dtNasc;
    #cep;
    #endereco;
    #numero;
    #complemento;
    #bairro;
    #cidade;
    #estado;
    #contato;
    #email;
    #observacao;
    #pets;

    constructor(id, nome, rg, cpf, dtNasc, cep, endereco, numero, complemento, bairro, cidade, estado, contato, email, observacao, pets){
        this.#id = id;
        this.#nome = nome;
        this.#rg = rg;
        this.#cpf = cpf;
        this.#dtNasc = dtNasc;
        this.#cep = cep;
        this.#endereco = endereco;
        this.#numero = numero;
        this.#complemento = complemento;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#estado = estado;
        this.#contato = contato;
        this.#email = email;
        this.#observacao = observacao;
        this.#pets = pets;
    }

    //métodos get e set
    get id(){
        return this.#id;
    }

    set id(novoId){
        this.#id = novoId;
    }
    
    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        this.#nome = novoNome;
    }

    get rg(){
        return this.#rg;
    }

    set rg(novoRg){
        this.#rg = novoRg;
    }

    get cpf(){
        return this.#cpf;
    }

    set cpf(novoCpf){
        this.#cpf = novoCpf;
    }

    get dtNasc(){
        return this.#dtNasc;
    }

    set dtNasc(novaDtNasc){
        this.#dtNasc = novaDtNasc;
    }

    get endereco(){
        return this.#endereco;
    }

    set endereco(novoEnd){
        this.#endereco = novoEnd;
    }

    get numero(){
        return this.#numero;
    }

    set numero(novoNumero){
        this.#numero = novoNumero;
    }

    get complemento(){
        return this.#complemento;
    }

    set complemento(novoComplemento){
        this.#complemento = novoComplemento;
    }

    get bairro(){
        return this.#bairro;
    }

    set bairro(novoBairro){
        this.#bairro = novoBairro;
    }

    get cep(){
        return this.#cep;
    }

    set cep(novoCep){
        this.#cep = novoCep;
    }

    get cidade(){
        return this.#cidade;
    }

    set cidade(novaCidade){
        this.#cidade = novaCidade;
    }

    get estado(){
        return this.#estado;
    }

    set estado(novoEstado){
        this.#estado = novoEstado;
    }

    get contato(){
        return this.#contato;
    }

    set contato(novoContato){
        this.#contato = novoContato;
    }

    get email(){
        return this.#email;
    }

    set email(novoEmail){
        this.#email = novoEmail;
    }

    get observacao(){
        return this.#observacao;
    }

    set observacao(novaObs){
        this.#observacao = novaObs;
    }

    get pets(){
        return this.#pets;
    }

    set pets(novaListaPets){
        this.#pets = novaListaPets;
    }

    toJSON () {
        return {
            "id": this.#id,
            "nome": this.#nome,
            "rg" : this.#rg,
            "cpf" : this.#cpf,
            "dtNasc": this.#dtNasc,
            "cep" : this.#cep,
            "endereco" : this.#endereco,
            "numero" : this.#numero,
            "complemento" : this.#complemento,
            "bairro" : this.#bairro,
            "cidade" : this.#cidade,
            "estado" : this.#estado,
            "contato": this.#contato,
            "email": this.#email,
            "observacao": this.observacao,
            "pets": this.#pets.map((pet) => {return pet.toJSON()})
        }
    }
}