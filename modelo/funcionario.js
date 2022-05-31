//Classe para modelar #- Junior

export default class Funcionario{
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
    #email;
    #periodo;
    #regimeTrab;
    #flagVet;
    #crmv;
    #especialidade;
    #calendario;

    constructor(id, nome, rg, cpf, dtNasc, endereco, numero, complemento, bairro, cep, cidade, estado, contato,email,periodo,regimeTrab,flagVet,crmv,especialidade,calendario){
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
        this.#email = email;
        this.#periodo = periodo;
        this.#regimeTrab = regimeTrab;
        this.#flagVet = flagVet;
        this.#crmv = crmv;
        this.#especialidade = especialidade;
        this.#calendario = calendario;
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
    get email() {
        return this.#email;
    }
    set email(novoEmail) {
        this.#email = novoEmail;
    }
    get periodo() {
        return this.#periodo;
    }
    set periodo(novoPeriodo) {
        this.#periodo = novoPeriodo;
    }
    get regimeTrab() {
        return this.#regimeTrab;
    }
    set regimeTrab(novoRegimeTrab) {
        this.#regimeTrab = novoRegimeTrab;
    }
    get flagVet() {
        return this.#flagVet;
    }
    set flagVet(novoFlagVet) {
        this.#flagVet = novoFlagVet;
    }
    get crmv() {
        return this.#crmv;
    }
    set crmv(novoCrmv) {
        this.#crmv = novoCrmv;
    }
    get especialidade() {
        return this.#especialidade;
    }
    set especialidade(novoEspecialidade) {
        this.#especialidade = novoEspecialidade;
    }
    get calendario() {
        return this.#calendario;
    }
    set calendario(novoCalendario) {
        this.#calendario = novoCalendario;
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
            "email": this.#email,
            "periodo": this.#periodo,
            "regimeTrab": this.#regimeTrab,
            "flagVet": this.#flagVet,
            "crmv": this.#crmv,
            "especialidade": this.#especialidade,
            "calendario":this.#calendario
        }
    }
}