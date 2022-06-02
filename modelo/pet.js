export default class Pet{
    #id;
    #nome;
    #especie;
    #cor;
    #codProprietario;
    constructor(id, nome, especie, cor, codProprietario){
        this.#id = id;
        this.#nome = nome;
        this.#especie = especie;
        this.#cor = cor;
        this.#codProprietario = codProprietario;
    }


    //métodos
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

    get especie(){
        return this.#especie;
    }
    set especie(novaEspecie){
        this.#especie = novaEspecie;
    }

    get cor(){
        return this.#cor;
    }
    set cor(novaCor){
        this.#cor;
    }

    get codProprietario(){
        return this.#codProprietario;
    }
    set codProprietario(novoCodProprietario){
        this.#codProprietario = novoCodProprietario;
    }

    toJSON(){
        return {
            "id":this.#id,
            "nome":this.#nome,
            "especie":this.#especie,
            "cor":this.#cor,
            "codProprietario": this.#codProprietario
        }
    }
}
