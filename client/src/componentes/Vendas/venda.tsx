import { Component } from "react";

type props = {
    tema: string
}

export default class Venda extends Component<props> {


    componentDidMount(): void {
        var elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
    }

    render() {
        return (
            <>
                <div className="row">
                    <form className="col s12">
                        <div id="vendaModalLine" className="row">
                            <div className="input-field col s6">
                                <select id="option">
                                    <option value="">Escolha uma opção de venda</option>
                                    <option value="1">Serviço</option>
                                    <option value="2">Produto</option>
                                </select>
                                <label htmlFor="option">Opção</label>
                            </div>
                            <div className="input-field col s6">
                                <select id="option">
                                    <option value="">Escolha um Produto</option>
                                    <option value="1">Shampoo</option>
                                    <option value="2">Condicionador</option>
                                    <option value="3">Acetona</option>
                                </select>
                                <label htmlFor="option">Escolha um Produto</label>
                            </div>
                            <div id="vendaModalLine" className="row">
                                <div className="input-field col s12">
                                    <select id="option">
                                        <option value="">Escolha um cliente</option>
                                        <option value="1">Vitoria</option>
                                        <option value="2">Thales</option>
                                    </select>
                                    <label htmlFor="option">Escolha um Cliente</label>
                                </div>
                            </div>
                        </div>
                        <h6>Quantidade</h6>
                        <div id="vendaModalLine" className="row">
                            <div className="input-field col s12">
                                <input id="quantidade" type="text" className="validate" />
                                <label htmlFor="quantidade">Quantidade</label>
                            </div>
                        </div>
                    </form>
                </div >
            </>
        )
    }
}