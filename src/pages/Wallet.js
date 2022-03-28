import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/header';
import { fetchCurrency, fetchExchanges } from '../actions';
import HeaderItens from '../components/HeaderItens';

class Wallet extends React.Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'debit',
    tag: 'food',
  }

  componentDidMount() {
    const { attCurrency } = this.props;
    attCurrency();
  }

  onInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  onBtnClick = () => {
    const expense = this.state;
    const { saveExpense } = this.props;
    saveExpense(expense);
    this.setState({ value: '' });
  }

  render() {
    const { currencies } = this.props;
    const { value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    return (
      <>
        <Header />
        <form>
          <label htmlFor="value-input">
            Valor
            <input
              data-testid="value-input"
              id="value-input"
              type="text"
              value={ value }
              name="value"
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="currency-input">
            Moeda
            <select
              data-testid="currency-input"
              id="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.onInputChange }
            >
              {currencies.filter((item) => item !== 'USDT').map((item) => (
                <option
                  data-testid={ item }
                  key={ item }
                >
                  { item }
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method-input">
            Método de pagamento
            <select
              data-testid="method-input"
              id="method-input"
              name="method"
              value={ method }
              onChange={ this.onInputChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="categorie">
            Categoria
            <select
              data-testid="tag-input"
              id="categorie"
              name="tag"
              value={ tag }
              onChange={ this.onInputChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição
            <input
              data-testid="description-input"
              id="description"
              type="text"
              value={ description }
              name="description"
              onChange={ this.onInputChange }
            />
          </label>
          <button
            type="button"
            onClick={ this.onBtnClick }
          >
            Adicionar despesa
          </button>
        </form>
        <HeaderItens />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (expense) => dispatch(fetchExchanges(expense)),
  attCurrency: () => dispatch(fetchCurrency()),
});

const mapStateToProps = (state) => ({
  currencies: Object.keys(state.wallet.currencies),
});

Wallet.propTypes = {
  saveExpense: PropTypes.func.isRequired,
  attCurrency: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
