/* eslint-disable @typescript-eslint/no-useless-constructor */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";
import "../Style/myStyle.css";
import FormularioCadastroServico from "../Formulario/formularioCadastroServico";
import VendaServico from "../Vendas/vendaServico";
import VendaServicoAll from "../Vendas/vendaServicoAll";
import Swal from "sweetalert2";
import FormularioEdicaoServico from "../Formulario/edicao/formularioEdicaoServico";
import Servico from "../../Models/servico";
import HistoricoServicoAll from "../Historico/HistoricoServico/historicoServicoAll";

type props = {
  tema: string;
};

type state = {
  servicos: Array<any>
  servicoSelected: Servico | undefined
};

export default class ListaServico extends Component<props, state> {

  constructor(props) {
    super(props);
    this.state = {
      servicos: [],
      servicoSelected: undefined
    }
    this.onClickDelete = this.onClickDelete.bind(this)
    this.onClickEdit = this.onClickEdit.bind(this)
  }

  componentDidMount() {
    var elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems);

    var elemsModal = document.querySelectorAll('.modal');
    M.Modal.init(elemsModal);

    fetch("http://localhost:3001/servico", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(r => r.json()).then(r => {
      this.setState({
        servicos: r
      })
    });
  }


  onClickEdit(event) {
    let id = event.target.id
    let idNumber = new Number(id).valueOf()
    let servico = this.state.servicos.find(item => item.id == idNumber);
    this.setState({
      servicoSelected: servico
    })
  }

  async deleteServico(id): Promise<boolean> {
    let retorno = false
    await fetch("http://localhost:3001/servico/deletar/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      retorno = response.status === 200
    })
    return retorno
  }

  onClickDelete(event) {
    let id = event.target.id
    Swal.fire({
      title: 'Deletar serviço',
      text: "Essa ação não pode ser revertida!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!'

    }).then(async (result) => {
      if (result.isConfirmed) {
        let deleted = await this.deleteServico(id)
        if (deleted) {
          Swal.fire(
            'Deletado!',
            'Serviço deletado com sucesso.',
            'success'
          ).then(result => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            window.location.reload()
          })
        } else {
          Swal.fire(
            'Erro!',
            'Um erro ocorreu.',
            'error'
          ).then(result => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            window.location.reload()
          })
        }
      }
    })
  }


  render() {
    return (
      <div id="backgroundClientContainer">
        <div id="titleContainer">
          <h4 id="Title">Serviços cadastrados</h4>
        </div>
        <div id="collapsibleContainer">
          <ul className="collapsible">
            {this.state.servicos.map(item => {
              let servico = new Servico(item.nome, item.preco)
              servico.id = item.id
              let dataCadastro = new Date(item.createdAt)
              return (
                <li key={servico.nome}>
                  <div id="collapsibleHeader" className="collapsible-header">
                    {servico.nome}
                  </div>
                  <div id="collapsibleBody" className="collapsible-body">
                    <span>Preço R$: {servico.preco}</span><br />
                    <span>Cadastrado em: {dataCadastro.toLocaleString()}</span>
                    <br />
                    <div id="editDeleteButtonContainer">
                      <a href="#modalEdit" id="editDeleteButton" className="btn-floating btn-medium blue accent modal-trigger"><i id={item.id} onClick={this.onClickEdit} className="small material-icons">create</i></a>
                      <a href="#" id="editDeleteButton" className="btn-floating btn-medium blue accent"><i id={item.id} onClick={this.onClickDelete} className="small material-icons">delete</i></a>
                      {/* Colocar para abrir modal de venda */}
                      <a href="#modalSell" id="editDeleteButton" className="btn-floating btn-medium blue accent modal-trigger"><i className="small material-icons">monetization_on</i></a>
                      {/* Colocar para abrir modal de histórico */}
                      <a href="#modalHistory" id="editDeleteButton" className="btn-floating btn-medium blue accent modal-trigger"><i className="small material-icons">access_time</i></a>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
        <div id="addButtonContainer">
          <a
            href="#modalCadastro"
            className="btn-floating btn-large blue accent modal-trigger"
          >
            <i className="large material-icons">add</i>
          </a>
        </div>
        <div id="sellButtonContainer">
          <a
            href="#modalSellAll"
            className="btn-floating btn-large blue accent modal-trigger"
          >
            <i className="large material-icons">monetization_on</i>
          </a>
        </div>
        <div id="historyButtonContainer">
          <a
            href="#modalHistoryAll"
            className="btn-floating btn-large blue accent modal-trigger"
          >
            <i className="large material-icons">access_time</i>
          </a>
        </div>

        <div id="modalCadastro" className="modal modal-fixed-footer">
          <FormularioCadastroServico tema="#ff4081 blue accent" />
        </div>

        <div id="modalEdit" className="modal modal-fixed-footer">
          {this.state.servicoSelected !== undefined ? <FormularioEdicaoServico servico={this.state.servicoSelected} /> : <></>}
        </div>

        <div id="modalSell" className="modal modal-fixed-footer">
          <div className="modal-content">
            <h5>Venda</h5>
            <VendaServico tema="#ff4081 blue accent" />
          </div>
          <div className="modal-footer">
            <button
              id="cancelButtonContainer"
              className="modal-close waves-effect waves-light btn-flat"
            >
              <a href="#!">
                <i id="cancelButton" className="material-icons right">
                  cancel
                </i>
              </a>
              Cancelar
            </button>
            <button
              id="cadastrarButtonContainer"
              type="submit"
              name="action"
              className="modal-close waves-effect waves-light btn-flat"
            >
              <a href="#!">
                <i id="sendButton" className="material-icons right">
                  send
                </i>
              </a>
              Confirmar
            </button>
          </div>
        </div>

        <div id="modalSellAll" className="modal modal-fixed-footer">
          <div className="modal-content">
            <h5>Venda</h5>
            <VendaServicoAll tema="#ff4081 pink accent-2" />
          </div>
          <div className="modal-footer">
            <button
              id="cancelButtonContainer"
              className="modal-close waves-effect waves-light btn-flat"
            >
              <a href="#!">
                <i id="cancelButton" className="material-icons right">
                  cancel
                </i>
              </a>
              Cancelar
            </button>
            <button
              id="cadastrarButtonContainer"
              type="submit"
              name="action"
              className="modal-close waves-effect waves-light btn-flat"
            >
              <a href="#!">
                <i id="sendButton" className="material-icons right">
                  send
                </i>
              </a>
              Confirmar
            </button>
          </div>
        </div>

        <div id="modalHistoryAll" className="modal modal-fixed-footer">
          <div className="modal-content">
            <h5>Histórico de Vendas</h5>
            <HistoricoServicoAll tema="#ff4081 blue accent" />
          </div>
          <div className="modal-footer">
            <button
              id="cadastrarButtonContainer"
              type="submit"
              name="action"
              className="modal-close waves-effect waves-light btn-flat"
            >
              <a href="#!">
                <i id="sendButton" className="material-icons right">
                  check
                </i>
              </a>
              Ok
            </button>
          </div>
        </div>

        <div id="modalHistory" className="modal modal-fixed-footer">
          <div className="modal-content">
            <h5>Histórico de Vendas</h5>
            {/* Colocar histórico de vendas de serviços */}
          </div>
          <div className="modal-footer">
            <button
              id="cadastrarButtonContainer"
              type="submit"
              name="action"
              className="modal-close waves-effect waves-light btn-flat"
            >
              <a href="#!">
                <i id="sendButton" className="material-icons right">
                  check
                </i>
              </a>
              Ok
            </button>
          </div>
        </div>
      </div>
    );
  }
}
