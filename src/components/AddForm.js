import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, saveExpense } from '../actions';
import fetchCurrency from '../services';
import '../style/AddForm.css';

const INITIAL_STATE = {
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Cash',
  tag: 'Food',
  id: 0,
  total: '0.00',
};

class AddForm extends Component {
  constructor() {
    super();

    this.state = {
      ...INITIAL_STATE,
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { getCurrency } = this.props;
    getCurrency();
  }

  onChangeHandler({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  async handleClick(event) {
    event.preventDefault();
    const { value, description, currency, method, tag, id } = this.state;
    const { saveExpenses } = this.props;
    const exchangeRates = await fetchCurrency();

    const expense = {
      value,
      description,
      currency,
      method,
      tag,
      id,
      exchangeRates,
    };

    saveExpenses(expense);

    this.setState({
      ...INITIAL_STATE,
      id: id + 1,
    });
  }

  tagRender() {
    return (
      <div>
        <label htmlFor="tag">
          Tag:
          <select
            id="tag"
            name="tag"
            onChange={ (e) => this.onChangeHandler(e) }
            data-testid="tag-input"
            className="form-select"
          >
            <option value="Food">Food</option>
            <option value="Recreation">Recreation</option>
            <option value="Work">Work</option>
            <option value="Transport">Transport</option>
            <option value="Health">Health</option>
          </select>
        </label>
      </div>
    );
  }

  methodRender() {
    return (
      <div>
        <label htmlFor="method" className="size">
          Payment Method:
          <select
            id="method"
            name="method"
            onChange={ (e) => this.onChangeHandler(e) }
            data-testid="method-input"
            className="form-select"
          >
            <option value="Cash">Cash</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
          </select>
        </label>
      </div>
    );
  }

  currencyRender(currenciesList) {
    return (
      <select
        id="currency"
        name="currency"
        onChange={ (e) => this.onChangeHandler(e) }
        data-testid="currency-input"
        className="form-select"
      >
        { currenciesList.map((currency) => (
          currency === 'USDT' ? ''
            : <option key={ currency } data-testid={ currency }>{ currency }</option>
        )) }
      </select>
    );
  }

  render() {
    const { value, description } = this.state;
    const { currencies } = this.props;
    const currenciesTags = Object.keys(currencies || {});

    return (
      <div className="addTable">
        <div>
          <label htmlFor="value">
            Value:
            <input
              id="value"
              name="value"
              value={ value }
              type="number"
              onChange={ (e) => this.onChangeHandler(e) }
              data-testid="value-input"
              className="form-control"
            />
          </label>
        </div>
        <div>
          <label htmlFor="currency">
            Currency:
            { this.currencyRender(currenciesTags) }
          </label>
        </div>
        { this.methodRender() }
        { this.tagRender() }
        <div>
          <label htmlFor="description">
            Description:
            <input
              id="description"
              name="description"
              value={ description }
              type="text"
              onChange={ (e) => this.onChangeHandler(e) }
              data-testid="description-input"
              className="form-control"
            />
          </label>
        </div>
        <div>
          <button type="submit" className="btn btn-primary mt-4"onClick={ this.handleClick }>Add expense</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies[0],
  user: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrency: () => dispatch(fetchCurrencies()),
  saveExpenses: (expense) => dispatch(saveExpense(expense)),
});

AddForm.propTypes = {
  currencies: PropTypes.objectOf(PropTypes.object),
  getCurrency: PropTypes.func.isRequired,
  saveExpenses: PropTypes.func.isRequired,
};

AddForm.defaultProps = {
  currencies: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
