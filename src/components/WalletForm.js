import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI, saveCoins, queryExpenses, queryExpensesEdit } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: [],
      coins: [],
      edit: false,
    };
  }

  componentDidMount() {
    this.receiveAPI();
  }

  componentDidUpdate() {
    const { expenses, idToEdit, editor } = this.props;
    const { edit } = this.state;
    if (editor && !edit) {
      const ediction = expenses.filter((id) => +id.id === idToEdit);
      this.setState({
        id: ediction[0].id,
        value: ediction[0].value,
        description: ediction[0].description,
        currency: ediction[0].currency,
        method: ediction[0].method,
        tag: ediction[0].tag,
        edit: true,
      });
    }
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  receiveAPI = async () => {
    const { dispatch } = this.props;
    const arrayExchange = await fetchAPI();
    delete arrayExchange.USDT;
    const array = Object.keys(arrayExchange);
    this.setState({ coins: array });
    dispatch(saveCoins(array));
    this.setState({ exchangeRates: arrayExchange });
  };

  buttonClick = async () => {
    const { dispatch } = this.props;
    const { id, value, description, currency, method, tag,
      exchangeRates, edit } = this.state;
    if (!edit) {
      await fetchAPI();
      dispatch(queryExpenses({
        id, value, description, currency, method, tag, exchangeRates }));
    }
    if (edit) {
      this.buttonEdit();
    }
    this.setState({
      id: id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  buttonEdit = () => {
    const { dispatch } = this.props;
    const { id, value, description, currency, method, tag,
      exchangeRates } = this.state;
    dispatch(queryExpensesEdit({
      id, value, description, currency, method, tag, exchangeRates }));
    this.setState({
      edit: false,
    });
  };

  render() {
    const { value, description, method, tag, coins, currency, edit } = this.state;
    return (
      <form>
        <div className="div-1">
          <label htmlFor="description" className="label-wallet">
            Descrição da despesa
            <input
              id="description"
              className="description-input"
              name="description"
              type="text"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="tag" className="label-wallet">
            Categoria da despesa
            <select
              id="tag"
              className="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </div>
        <div className="div-2">
          <label htmlFor="value" className="label-wallet">
            Valor
            <input
              id="value"
              className="value-input"
              name="value"
              type="text"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="method" className="label-wallet">
            Método de pagamento
            <select
              id="method"
              className="method-input"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="coin" className="label-wallet">
            Moeda
            <select
              id="coin"
              className="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              { coins.map((coin) => <option key={ coin }>{ coin }</option>) }
            </select>
          </label>
        </div>
        <div>
          <button
            type="button"
            className="button-add"
            onClick={ this.buttonClick }
          >
            { !edit ? 'Adicionar despesa' : 'Editar despesa' }
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
  editor: state.wallet.editor,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(String).isRequired,
  idToEdit: PropTypes.number.isRequired,
  editor: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
