export default class Produto{
    public nome: string
    public preco: number
    public estoque: number
    public id!: number
    public createdAt!: Date
    public updatedAt!: Date

    constructor(nome: string, preco: number, estoque: number){
        this.nome = nome
        this.preco = preco
        this.estoque = estoque
    }
}