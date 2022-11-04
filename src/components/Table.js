import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { queryExpensesDelete,
  queryExpensesEdit, queryExpensesEditTrue } from '../redux/actions';

class Table extends Component {
  buttonRemove = ({ target }) => {
    const { expenses, dispatch } = this.props;
    const expenseRemove = expenses.filter((expense) => +target.id !== +expense.id);
    dispatch(queryExpensesDelete(expenseRemove));
  };

  buttonEdit = ({ target }) => {
    const { expenses, dispatch } = this.props;
    const expenseEdit = expenses.filter((expense) => +target.id === +expense.id);
    dispatch(queryExpensesEdit(expenseEdit[0].id));
    dispatch(queryExpensesEditTrue(true));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th value="Descrição">Descrição</th>
            <th value="Tag">Tag</th>
            <th value="Método de pagamento">Método de pagamento</th>
            <th value="Valor">Valor</th>
            <th value="Moeda">Moeda</th>
            <th value="Câmbio utilizado">Câmbio utilizado</th>
            <th value="Valor convertido">Valor convertido</th>
            <th value="Moeda de conversão">Moeda de conversão</th>
            <th value="Editar/Excluir">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((coin) => (
            <tr key={ coin.id }>
              <td>{ coin.description }</td>
              <td>{ coin.tag }</td>
              <td>{ coin.method }</td>
              <td>{ (+coin.value).toFixed(2) }</td>
              <td>{ coin.exchangeRates[coin.currency].name }</td>
              <td>{ (+coin.exchangeRates[coin.currency].ask).toFixed(2) }</td>
              <td>
                { (+coin.value * +coin.exchangeRates[coin.currency].ask).toFixed(2) }
              </td>
              <td>Real</td>
              <td>
                <button
                  id={ coin.id }
                  data-testid="edit-btn"
                  type="button"
                  onClick={ this.buttonEdit }
                >
                  Editar
                </button>
                <button
                  id={ coin.id }
                  type="button"
                  data-testid="delete-btn"
                  onClick={ this.buttonRemove }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(String).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
