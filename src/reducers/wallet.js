// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SAVE_EXPENSES':
    action.payload.id = state.expenses.length;
    return { ...state, expenses: [...state.expenses, action.payload] };
  case 'ATT_CURRENCIES':
    return { ...state, currencies: action.payload };
  default:
    return state;
  }
}

export default wallet;
