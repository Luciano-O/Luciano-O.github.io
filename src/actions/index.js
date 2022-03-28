export const saveEmail = (email) => ({ type: 'LOGIN', payload: email });

export const saveExpense = (expense) => ({ type: 'SAVE_EXPENSES', payload: expense });

export const attCurrency = (currency) => ({ type: 'ATT_CURRENCIES', payload: currency });

export function fetchExchanges(expense) {
  return (dispatch) => {
    (fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((exchangeRates) => dispatch(saveExpense({ ...expense, exchangeRates })))
    );
  };
}

export function fetchCurrency() {
  return (dispatch) => {
    (fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((exchangeRates) => dispatch(attCurrency(exchangeRates)))
    );
  };
}
