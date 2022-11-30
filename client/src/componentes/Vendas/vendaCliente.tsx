import { Component } from "react";

type props = {
    tema: string
}

export default class VendaCliente extends Component<props> {


    componentDidMount(): void {
        var elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
    }

    render() {
        return (
            <>
                <div className="row">
                    <form className="col s12">
                        <h6>Opções</h6>
                        <div id="vendaModalLine" className="row">
                            <div className="input-field col s6">
                                <select id="option">
                                    <option value="">Escolha uma opção de venda</option>
                                    <option value="1">Serviço</option>
                                    <option value="2">Produto</option>
                                </select>
                                <label htmlFor="option">Venda</label>
                            </div>
                            <div className="input-field col s6">
                                <select id="option">
                                    <option value="">Escolha um Produto</option>
                                    <option value="1">Esmalte</option>
                                    <option value="2">Shampoo</option>
                                    <option value="3">Condicionador</option>
                                </select>
                                <label htmlFor="option">Produto/Serviço</label>
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