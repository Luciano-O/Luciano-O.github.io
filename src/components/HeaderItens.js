import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class HeaderItens extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <tr>
          <th role="columnheader" scope="col">Descrição</th>
          <th role="columnheader" scope="col">Tag</th>
          <th role="columnheader" scope="col">Método de pagamento</th>
          <th role="columnheader" scope="col">Valor</th>
          <th role="columnheader" scope="col">Moeda</th>
          <th role="columnheader" scope="col">Câmbio utilizado</th>
          <th role="columnheader" scope="col">Valor convertido</th>
          <th role="columnheader" scope="col">Moeda de conversão</th>
          <th role="columnheader" scope="col">Editar/Excluir</th>
        </tr>
        {expenses && expenses.map((item) => (
          <tr key={ item.id }>
            <td role="cell">{ item.description }</td>
            <td role="cell">{ item.tag }</td>
            <td role="cell">{ item.method }</td>
            <td role="cell">{ parseFloat(item.value).toFixed(2) }</td>
            <td role="cell">{ item.exchangeRates[item.currency].name }</td>
            <td
              role="cell"
            >
              { parseFloat(item.exchangeRates[item.currency].ask).toFixed(2) }
            </td>
            <td role="cell">
              { ((parseFloat(item.exchangeRates[item.currency].ask))
                * item.value).toFixed(2) }
            </td>
            <td role="cell">Real</td>
            <td role="cell">
              <button type="button">Editar</button>
              <button type="button">Excluir</button>
            </td>
          </tr>
        ))}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

HeaderItens.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(HeaderItens);
