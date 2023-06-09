import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../images/trybeWallet.png';
import user from '../images/user.png';
import coins from '../images/coins.png';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const total = expenses
      .reduce((acc, curr) => {
        const coin = curr.currency;
        return +curr.exchangeRates[coin].ask * +curr.value + acc;
      }, 0);
    return (
      <header>
        <div className="div-header">
          <img src={ logo } alt="logo" />
          <div className="div-header-values">
            <img src={ coins } alt="coins" />
            { `Total de despesas: ${total.toFixed(2)} BRL` }
          </div>
          <div className="div-header-user">
            <img src={ user } alt="user" />
            { email }
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(String).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
