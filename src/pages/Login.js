import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userInfo } from '../actions';
import '../style/login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.disableButton = this.disableButton.bind(this);

    this.state = {
      email: '',
      password: '',
      redirect: false,
    };
  }

  onChangeHandler(field, newValue) {
    this.setState({ [field]: newValue });
  }

  disableButton(func) {
    const re = /\S+@\S+\.\S+/;
    const minLength = 6;
    const { email, password } = this.state;
    const funcs = (data) => {
      func(data);
      this.setState({
        redirect: true,
      });
    };
    const boolean = !(password.length >= minLength && re.test(email));
    return (
      <button type="submit" className="btn btn-warning btn-size" disabled={boolean} onClick={ () => funcs(email) }>Login</button>
    );
  }

  render() {
    const { getEmail } = this.props;
    const { redirect } = this.state;
    if (redirect === true) {
      return <Redirect to="/carteira" />;
    }
    return (
      <div className="position-absolute top-50 start-50 translate-middle login-box">
        <img src="/currency_wallet.png" alt="wallet"/>
        <h1>World Wallet</h1>
        <div>
          <input
            type="email"
            data-testid="email-input"
            placeholder="Name@example.com"
            onChange={ (e) => this.onChangeHandler('email', e.target.value) }
            className="form-control input-width"
          />
          <input
            placeholder="Password"
            type="password"
            data-testid="password-input"
            onChange={ (e) => this.onChangeHandler('password', e.target.value) }
            className="form-control input-width"
          />
          { this.disableButton(getEmail) }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getEmail: (email) => dispatch(userInfo(email)),
});

Login.propTypes = {
  getEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
