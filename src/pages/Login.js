import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { func } from 'prop-types';
import { saveEmail } from '../actions';

class Login extends React.Component {
  state = {
    inputEmail: '',
    inputPassword: '',
    isDisable: true,
    logged: false,
  }

  checkEmail = (email) => {
    const limit = -1;
    if (email === ''
      || email.indexOf('@') === limit
      || email.indexOf('.') === limit
      || email.indexOf('.') === email.length - 1) {
      return false;
    } return true;
  }

  checkBtn = () => {
    const minCar = 6;
    const { inputEmail, inputPassword } = this.state;
    const valideEmail = this.checkEmail(inputEmail);
    if (valideEmail && (inputPassword.length >= minCar)) {
      this.setState({ isDisable: false });
    } else {
      this.setState({ isDisable: true });
    }
  }

  onBtnClick = () => {
    const { dispachEmail } = this.props;
    const { inputEmail } = this.state;
    dispachEmail(inputEmail);
    this.setState({ logged: true });
  }

  onInputChange = ({ target }) => {
    if (target.type === 'email') {
      this.setState({ inputEmail: target.value }, () => this.checkBtn());
    } else {
      this.setState({ inputPassword: target.value }, () => this.checkBtn());
    }
  }

  render() {
    const { isDisable, inputEmail, inputPassword, logged } = this.state;
    return (
      <>
        {logged && <Redirect to="/carteira" />}
        <form>
          <input
            type="email"
            data-testid="email-input"
            onChange={ this.onInputChange }
            value={ inputEmail }
          />
          <input
            type="password"
            data-testid="password-input"
            onChange={ this.onInputChange }
            value={ inputPassword }
          />
          <button
            type="button"
            disabled={ isDisable }
            onClick={ this.onBtnClick }
          >
            Entrar
          </button>
        </form>
      </>
    );
  }
}

Login.propTypes = {
  dispatchEmail: func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  dispachEmail: (email) => dispatch(saveEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
