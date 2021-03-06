import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../style/header.css';

class Headers extends Component {
  getTotal() {
    const { expenses } = this.props;

    return expenses
      .map(({ currency, value, exchangeRates }) => {
        const currencyData = exchangeRates[currency];
        const total = Number(value) * Number(currencyData.ask);
        return total;
      })
      .reduce((acc, expense) => acc + expense, 0);
  }

  render() {
    const { user } = this.props;
    return (
      <header>
        <h1>
          World Wallet
        </h1>
        <h3>
          Email:
          <span data-testid="email-field" className="me-5">{ user }</span>
          Total expenditure: R$
          <span data-testid="total-field">
            { (Math.round(this.getTotal() * 100) / 100).toFixed(2) }
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </h3>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  expenses: state.wallet.expenses,
});

Headers.propTypes = {
  user: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object),
};

Headers.defaultProps = {
  expenses: [],
};

export default connect(mapStateToProps)(Headers);
