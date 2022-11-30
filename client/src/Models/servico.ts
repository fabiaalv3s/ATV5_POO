export default class Servico{
    public nome: string
    public preco: number
    public id!: number
    public createdAt!: Date
    public updatedAt!: Date

    constructor(nome: string, preco: number){
        this.nome = nome
        this.preco = preco
    }
}