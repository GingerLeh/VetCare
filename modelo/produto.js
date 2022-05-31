export default class Produto {
    //definição dos atributos privados desta classe
    #id
    #descricao
    #categoria
    #dataValidade
    #custoUnitario
    #margemLucro
    #vendaControlada

    constructor(id, descricao, categoria, dataValidade, custoUnitario, margemLucro, vendaControlada) {
        this.#id = id;
        this.#descricao = descricao;
        this.#categoria = categoria;
        this.#dataValidade = dataValidade;
        this.#custoUnitario = custoUnitario;
        this.#margemLucro = margemLucro;
        this.#vendaControlada = vendaControlada
    }

    get id() {
        return this.#id;
    }
    set id(novoId) {
        this.#id = novoId;
    }

    get descricao() {
        return this.#descricao;
    }
    set descricao(novaDescricao) {
        this.#descricao = novaDescricao;
    }

    get categoria() {
        return this.#categoria;
    }
    set categoria(novaCategoria) {
        this.#categoria = novaCategoria;
    }

    get dataValidade() {
        return this.#dataValidade;
    }
    set dataValidade(novaDataValidade) {
        this.#dataValidade = novaDataValidade;
    }

    get custoUnitario() {
        return this.#custoUnitario;
    }
    set custoUnitario(novoCustoUnitario) {
        this.#custoUnitario = novoCustoUnitario;
    }

    get margemLucro() {
        return this.#margemLucro;
    }
    set margemLucro(novaMargemLucro) {
        this.#margemLucro = novaMargemLucro;
    }

    get vendaControlada() {
        return this.#vendaControlada;
    }
    set vendaControlada(novaVendaControlada) {
        this.#vendaControlada = novaVendaControlada;
    }

    //Javascript Object Notation
    toJSON() {
        return {
            "id": this.#id,
            "descricao": this.#descricao,
            "categoria": this.#categoria,
            "dataValidade": this.#dataValidade,
            "custoUnitario": this.#custoUnitario,
            "margemLucro": this.#margemLucro,
            "vendaControlada": this.#vendaControlada
        }
    }
}