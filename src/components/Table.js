import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../style/table.css';
import { removeExpense } from '../actions';

class Table extends Component {
  expensesTable({ value, description, currency, method, tag, id, exchangeRates }) {
    const { deleteExpense } = this.props;
    const currencyDetails = Object.entries(exchangeRates)
      .find((currencies) => currencies[0] === currency)[1];
      console.log(currencyDetails);

    return (
      <tr key={ id }>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{value}</td>
        <td>{ currencyDetails.code }</td>
        <td>
          R$
          { parseFloat(currencyDetails.ask).toFixed(2) }
        </td>
        <td>
          R$
          { (parseFloat(value) * parseFloat(currencyDetails.ask)).toFixed(2) }
        </td>
        <td>Real</td>
        <td>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => deleteExpense(id) }
            className="btn btn-danger"
          >
            X
          </button>
        </td>
      </tr>
    );
  }

  render() {
    const { expenses } = this.props;

    return (
      <div className="tableContainer">
        <table className="expenseTable">
          <thead>
            <tr>
              <th>Description</th>
              <th>Tag</th>
              <th>Payment Method</th>
              <th>Value</th>
              <th>Currency</th>
              <th>Currency Rate</th>
              <th>Exchange Value</th>
              <th>Conversion Currency</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            { expenses
              .map((expense) => (this.expensesTable(expense)))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(removeExpense(id)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  deleteExpense: PropTypes.func.isRequired,
};

Table.defaultProps = {
  expenses: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
