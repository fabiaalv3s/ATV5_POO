import { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "../Lista/listaCliente";
import ListaProduto from "../Lista/listaProduto";
import ListaServico from "../Lista/listaServico";
import Listagem from "../Lista/listagem";
import Home from "../home";

type state = {
    tela: string
}

export default class Roteador extends Component<{}, state> {
    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            tela: 'Clientes'
        }
        this.selecionarView = this.selecionarView.bind(this)
    }

    selecionarView(novaTela: string, evento: Event) {
        evento.preventDefault()
        console.log(novaTela);
        this.setState({
            tela: novaTela
        })
    }

    render() {
        let barraNavegacao = <BarraNavegacao seletorView={this.selecionarView} tema="#0e90a1c2 blue accent" botoes={['Home','Clientes', 'Produtos', 'Serviços', 'Listagem']} />
        if (this.state.tela === "Home") {
            return (
                <>
                    {barraNavegacao}
                    <Home tema="#0e90a1c2 blue accent"/>
                </>
            )
        } else if (this.state.tela === 'Clientes') {
            return (
                <>
                    {barraNavegacao}
                    <ListaCliente tema="#0e90a1c2 blue accent" />
                </>
            )
        } else if (this.state.tela === "Produtos") {
            return (
                <>
                    {barraNavegacao}
                    <ListaProduto tema="#0e90a1c2 blue accent" />
                </>
            )
        } else if (this.state.tela === "Serviços") {
            return (
                <>
                    {barraNavegacao}
                    <ListaServico tema="#0e90a1c2 blue accent" />
                </>
            )
        } else if (this.state.tela === "Listagem") {
            return (
                <>
                    {barraNavegacao}
                    <Listagem tema="#0e90a1c2 blue accent" />
                </>
            )
        }
    }
}