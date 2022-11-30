export default class Cliente{
    public nome: string
    public nomeSocial: string
    public cpf: string
    public telefone: string
    public email: string
    public genero: string
    public id!: number
    public createdAt!: Date
    public updatedAt!: Date

    constructor(nome: string, nomeSocial: string, cpf: string, telefone: string, email: string, genero: string){
        this.cpf = cpf
        this.nome = nome
        this.telefone = telefone
        this.nomeSocial = nomeSocial
        this.email = email
        this.genero = genero
    }
}