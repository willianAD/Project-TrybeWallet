import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
        <span data-testid="email-field">{ email }</span>
        <span data-testid="total-field">{ total.toFixed(2) }</span>
        <span data-testid="header-currency-field">BRL</span>
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
