import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI, saveCoins } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      expense: '',
      description: '',
      method: 'money',
      tag: 'food',
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
    const array = Object.keys(await fetchAPI());
    array.splice(1, 1);
    this.setState({ coins: array });
    dispatch(saveCoins(array));
  };

  render() {
    const { expense, description, method, tag, coins } = this.state;
    return (
      <form>
        <label htmlFor="expense">
          <input
            id="expense"
            data-testid="value-input"
            name="expense"
            type="text"
            value={ expense }
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
          <select id="coin" data-testid="currency-input">
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
            <option value="money">Dinheiro</option>
            <option value="creditCard">Cartão de crédito</option>
            <option value="debitCard">Cartão de débito</option>
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
            <option value="food">Alimentação</option>
            <option value="leisure">Lazer</option>
            <option value="work">Trabalho</option>
            <option value="transport">Transporte</option>
            <option value="health">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(WalletForm);
