import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      buttonDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, this.verifyInputs);
  };

  verifyInputs = () => {
    const { email, password } = this.state;
    const six = 6;
    const rejexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const validate = (rejexEmail.test(email) && password.length >= six);
    this.setState({
      buttonDisabled: !validate,
    });
  };

  buttonClick = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(userLogin(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, buttonDisabled } = this.state;
    return (
      <div>
        <label htmlFor="email">
          <input
            id="email"
            data-testid="email-input"
            type="email"
            name="email"
            value={ email }
            placeholder="E-mail"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          <input
            id="password"
            data-testid="password-input"
            type="password"
            name="password"
            value={ password }
            placeholder="password"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ buttonDisabled }
          onClick={ this.buttonClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
