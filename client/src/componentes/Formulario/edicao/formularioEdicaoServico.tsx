import { Component } from "react";
import Swal from "sweetalert2";
import Servico from "../../../Models/servico";

type props = {
    servico: Servico
}

export default class FormularioEdicaoServico extends Component<props> {

    private nome
    private preco

    constructor(props: props | Readonly<props>) {
        super(props);

        this.onClickNome = this.onClickNome.bind(this)
        this.onClickPreco = this.onClickPreco.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount(): void {
        var elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
        this.load()
    }

    componentDidUpdate(prevProps: Readonly<props>, prevState: Readonly<any>, snapshot?: any): void {
        if(this.props != prevProps){
            this.load()
        }
    }

    load(): void {
        this.setState({
            nome: this.props.servico.nome
        })
        this.nome = this.props.servico.nome
        this.preco = this.props.servico.preco
    }


    async cadastro(): Promise<boolean> {
        let retorno = false
        let mapeado = {
            nome: this.nome,
            preco: this.preco,
        }
        console.log(mapeado)
        await fetch("http://localhost:3001/servico/modificar/" + this.props.servico.id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mapeado)
        }).then(r => {
            retorno = r.status === 200
        })
        return retorno
    }

    async onSubmit() {
        if (!this.nome || !this.preco) {
            Swal.fire(
                'Erro!',
                'Preencha todos os campos.',
                'error'
            )
            return
        }

        let resposta = await this.cadastro()
        if (resposta) {
            Swal.fire(
                'Sucesso!',
                'Serviço atualizado com sucesso.',
                'success'
            ).then(result => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.location.reload()
            })
        } else {
            Swal.fire(
                'Erro!',
                'Não foi possível atualizar.',
                'error'
            ).then(result => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.location.reload()
            })
        }
    }

    onClickNome(event) {
        this.nome = event.target.value
    }

    onClickPreco(event) {
        this.preco = event.target.value
    }

    render() {
        return (
            <>
                <div className="modal-content">
                    <h5>Edição de Serviço</h5>
                    <div className="row">
                        <form className="col s12">
                            <div id="modalLine" className="row">
                                <div className="input-field col s12">
                                    <input defaultValue={this.nome} onChange={this.onClickNome} id="first_name" type="text" className="validate" />
                                    <label htmlFor="first_name" className="active">Nome</label>
                                </div>
                            </div>
                            <div id="modalLine" className="row">
                                <div className="input-field col s12">
                                    <input defaultValue={this.preco} id="preco" onChange={this.onClickPreco} type="number" className="validate" />
                                    <label htmlFor="preco" className="active">Preço</label>
                                </div>
                            </div>
                        </form>
                    </div >
                </div>
                <div className="modal-footer">
                    <button id="cancelButtonContainer" className="modal-close waves-effect waves-light btn-flat">
                        <a href="#!"><i id="cancelButton" className="material-icons right">cancel</i></a>Cancelar
                    </button>
                    <button id="cadastrarButtonContainer" onClick={this.onSubmit} type="submit" name="action" className="waves-effect waves-light btn-flat">
                        <a href="#!"><i id="sendButton" className="material-icons right">send</i></a>Atualizar
                    </button>
                </div>

            </>
        )
    }
}