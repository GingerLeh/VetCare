//Classe para modelar cliente - Junior

export default class Cliente{
    //Atributos da classe
    #id;
    #nome;
    #rg;
    #cpf;
    #dtNasc;
    #endereco;
    #numero;
    #complemento;
    #bairro;
    #cep;
    #cidade;
    #estado;
    #contato;
    #pets;

    constructor(id, nome, rg, cpf, dtNasc, endereco, numero, complemento, bairro, cep, cidade, estado, contato, pets){
        this.#id = id;
        this.#nome = nome;
        this.#rg = rg;
        this.#cpf = cpf;
        this.#dtNasc = dtNasc;
        this.#endereco = endereco;
        this.#numero = numero;
        this.#complemento = complemento;
        this.#bairro = bairro;
        this.#cep = cep;
        this.#cidade = cidade;
        this.#estado = estado;
        this.#contato = contato;
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

    get cep (){
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

    get pets(){
        return this.#pets;
    }

    set pets(listaPets){
        this.#pets = listaPets;
    }

    toJSON () {
        return {
            "id": this.#id,
            "nome": this.#nome,
            "rg" : this.#rg,
            "cpf" : this.#cpf,
            "dtNasc": this.#dtNasc,
            "endereco" : this.#endereco,
            "numero" : this.#numero,
            "complemento" : this.#complemento,
            "bairro" : this.#bairro,
            "cep" : this.#cep,
            "cidade" : this.#cidade,
            "estado" : this.#estado,
            "contato": this.#contato,
            "pets": this.#pets.map((pet) => pet.toJSON())
            
        }
    }
}