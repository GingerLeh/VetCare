export default class Pet{
    //definição de atributo de modo privado, utilizando #
    #id
    #nome
    #raca
    #peso
    #dataNascimento
    #porte
    #codproprietario

    constructor(id, nome, raca, peso, dataNascimento, porte,codproprietario){
        this.#id = id;
        this.#nome = nome;
        this.#raca = raca;
        this.#peso = peso;
        this.#dataNascimento = dataNascimento;
        this.#porte = porte;
        this.#codproprietario = codproprietario;
    }

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

    get raca(){
        return this.#raca;
    }
    set raca(novaRaca){
        this.#nome = novaRaca;
    }

    get peso(){
        return this.#peso;
    }
    set peso(novoPeso){
        this.#peso = novoPeso;
    }

    get dataNascimento(){
        return this.#dataNascimento;
    }
    set dataNascimento(novaDataNascimento){
        this.#dataNascimento = novaDataNascimento;
    }

    get porte(){
        return this.#porte;
    }
    set porte(novoPorte){
        this.#porte = novoPorte;
    }

    get codproprietario(){
        return this.#codproprietario;
    }
    set codproprietario(novoCodProprietario){
        this.#codproprietario = novoCodProprietario;
    }

    toJSON(){
        return{
            "id": this.#id,
            "nome":this.#nome,
            "raca":this.#raca,
            "peso":this.#peso,
            "dataNascimento":this.#dataNascimento,
            "porte:":this.#porte,
            "codProprietario":this.#codproprietario

        }
    }

}