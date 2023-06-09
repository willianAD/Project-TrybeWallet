import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { queryExpensesDelete,
  queryExpensesEdit, queryExpensesEditTrue } from '../redux/actions';
import edit from '../images/edit.png';
import del from '../images/delete.png';

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
      <table className="div-table">
        <thead>
          <tr>
            <th value="Descrição">Descrição</th>
            <div className="div-traco" />
            <th value="Tag">Tag</th>
            <div className="div-traco" />
            <th value="Método de pagamento">Método de pagamento</th>
            <div className="div-traco" />
            <th value="Valor">Valor</th>
            <div className="div-traco" />
            <th value="Moeda">Moeda</th>
            <div className="div-traco" />
            <th value="Câmbio utilizado">Câmbio utilizado</th>
            <div className="div-traco" />
            <th value="Valor convertido">Valor convertido</th>
            <div className="div-traco" />
            <th value="Moeda de conversão">Moeda de conversão</th>
            <div className="div-traco" />
            <th value="Editar/Excluir">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((coin) => (
            <tr key={ coin.id } className="tr-expenses">
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
                  type="button"
                  className="edit-btn"
                  onClick={ this.buttonEdit }
                >
                  <img src={ edit } alt="edit" />
                </button>
                <button
                  id={ coin.id }
                  type="button"
                  className="delete-btn"
                  onClick={ this.buttonRemove }
                >
                  <img src={ del } alt="delete" />
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
