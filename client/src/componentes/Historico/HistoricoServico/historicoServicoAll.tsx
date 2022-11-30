/* eslint-disable @typescript-eslint/no-useless-constructor */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";

import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import '../../Style/myStyle.css'


type props = {
    tema: string;
};

export default class HistoricoServicoAll extends Component<props> {

    componentDidMount() {
        var elems = document.querySelectorAll('.collapsible');
        M.Collapsible.init(elems);

        var elemsModal = document.querySelectorAll('.modal');
        M.Modal.init(elemsModal);
    }

    render() {
        return (
            <div id="historyCollapsibleContainer">
                <ul className="collapsible">
                    <li>
                        <div id="collapsibleHeader" className="collapsible-header">
                            Corte de Cabelo
                        </div>
                        <div id="collapsibleBody" className="collapsible-body">
                            <span>Thales 2x</span><br />
                            <hr />
                            <span>Total realizados: 2</span><br />
                        </div>
                    </li>
                    <li>
                        <div id="collapsibleHeader" className="collapsible-header">
                            Manicure e Pedicure
                        </div>
                        <div id="collapsibleBody" className="collapsible-body">
                            <span>Vitoria 1x</span><br />
                            <hr />
                            <span>Total realizados: 1</span><br />
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}
