import { Component } from "react";

type props = {
    tema: string
}

export default class VendaServicoAll extends Component<props> {


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
                                    <option value="">Escolha um Serviço</option>
                                    <option value="1">Manicure</option>
                                    <option value="2">Pedicure</option>
                                    <option value="3">Corte Simples</option>
                                </select>
                                <label htmlFor="option">Serviço</label>
                            </div>
                            <div className="input-field col s6">
                                <select id="option">
                                    <option value="">Escolha um Cliente</option>
                                    <option value="1">Fabia</option>
                                    <option value="2">Rafael</option>
                                </select>
                                <label htmlFor="option">Cliente</label>
                            </div>
                        </div>
                        <h6>Quantidade</h6>
                        <div id="vendaModalLine" className="row">
                            <div className="input-field col s12">
                                <input id="bairro" type="text" className="validate" />
                                <label htmlFor="bairro">Quantidade</label>
                            </div>
                        </div>
                    </form>
                </div >
            </>
        )
    }
}