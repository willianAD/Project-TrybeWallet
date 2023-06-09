export const USER_LOGIN = 'USER_LOGIN';
export const SAVE_COINS = 'SAVE_COINS';
export const QUERY_EXPENSES = 'QUERY_EXPENSES';
export const QUERY_EXPENSES_DELETE = 'QUERY_EXPENSES_DELETE';
export const QUERY_EXPENSES_EDIT = 'QUERY_EXPENSES_EDIT';
export const QUERY_EXPENSES_EDIT_TRUE = 'QUERY_EXPENSES_EDIT_TRUE';

export const userLogin = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export const saveCoins = (payload) => ({
  type: SAVE_COINS,
  payload,
});

export const queryExpenses = (payload) => ({
  type: QUERY_EXPENSES,
  payload,
});

export const queryExpensesDelete = (payload) => ({
  type: QUERY_EXPENSES_DELETE,
  payload,
});

export const queryExpensesEdit = (payload) => ({
  type: QUERY_EXPENSES_EDIT,
  payload,
});

export const queryExpensesEditTrue = (payload) => ({
  type: QUERY_EXPENSES_EDIT_TRUE,
  payload,
});

export const fetchAPI = () => fetch('https://economia.awesomeapi.com.br/json/all').then((response) => response.json());
