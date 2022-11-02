import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI, saveCoins, queryExpenses } from '../redux/actions';

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
    };
  }

  componentDidMount() {
    this.receiveAPI();
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
    await fetchAPI();
    const { dispatch } = this.props;
    const { id, value, description, currency, method, tag, exchangeRates } = this.state;
    dispatch(queryExpenses({
      id, value, description, currency, method, tag, exchangeRates }));
    this.setState({
      id: id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { value, description, method, tag, coins, currency } = this.state;
    return (
      <form>
        <label htmlFor="value">
          <input
            id="value"
            data-testid="value-input"
            name="value"
            type="text"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          <input
            id="description"
            data-testid="description-input"
            name="description"
            type="text"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="coin">
          <select
            id="coin"
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            { coins.map((coin) => <option key={ coin }>{ coin }</option>) }
          </select>
        </label>
        <label htmlFor="method">
          <select
            id="method"
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          <select
            id="tag"
            data-testid="tag-input"
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
        <button
          type="button"
          onClick={ this.buttonClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
