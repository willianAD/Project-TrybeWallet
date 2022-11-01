export const USER_LOGIN = 'USER_LOGIN';
export const SAVE_COINS = 'SAVE_COINS';
export const QUERY_EXPENSES = 'QUERY_EXPENSES';

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

export const fetchAPI = () => fetch('https://economia.awesomeapi.com.br/json/all').then((response) => response.json());
