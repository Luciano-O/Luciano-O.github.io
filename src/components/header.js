import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { user, expenses } = this.props;
    const sum = expenses.reduce((acc, { currency, value, exchangeRates }) => {
      const { ask } = exchangeRates[currency];
      const itemValue = Number(value);
      const currencyValue = Number(ask);
      return acc + (itemValue * currencyValue);
    }, 0);
    return (
      <header>
        <p data-testid="email-field">{ user.email }</p>
        <p data-testid="total-field">{ sum.toFixed(2) }</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  expenses: state.wallet.expenses });

Header.propTypes = {
  user: PropTypes.shape({ email: PropTypes.string.isRequired }).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
