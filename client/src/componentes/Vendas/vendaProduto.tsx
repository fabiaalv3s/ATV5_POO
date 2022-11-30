import { Component } from "react";

type props = {
    tema: string
}

export default class VendaProduto extends Component<props> {


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
                            <div className="input-field col s12">
                                <select id="option">
                                    <option value="">Escolha um cliente</option>
                                    <option value="1">Fábia</option>
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