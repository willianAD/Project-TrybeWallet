import { SAVE_COINS, QUERY_EXPENSES_EDIT_TRUE, QUERY_EXPENSES,
  QUERY_EXPENSES_DELETE, QUERY_EXPENSES_EDIT } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const expensesEdit = (expenses, payload) => expenses.map((expense) => {
  console.log(expense, payload);
  if (+payload.id === +expense.id) {
    return {
      ...expense,
      value: payload.value,
      description: payload.description,
      currency: payload.currency,
      method: payload.method,
      tag: payload.tag,
    };
  }
  return expense;
});

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_COINS:
    return {
      ...state,
      currencies: action.payload,
    };
  case QUERY_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case QUERY_EXPENSES_DELETE:
    return {
      ...state,
      expenses: action.payload,
    };
  case QUERY_EXPENSES_EDIT:
    return {
      ...state,
      // idToEdit: action.payload,
      editor: false,
      expenses: expensesEdit(state.expenses, action.payload),
    };
  case QUERY_EXPENSES_EDIT_TRUE:
    return {
      ...state,
      editor: true,
    };
  default:
    return state;
  }
};

export default wallet;
