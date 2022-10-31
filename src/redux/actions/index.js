const USER_LOGIN = 'USER_LOGIN';
const QUERY_COINS = 'QUERY_COINS';

const userLogin = (payload) => ({
  type: USER_LOGIN,
  payload,
});

const funcWallet = (payload) => ({
  type: QUERY_COINS,
  payload,
});

export { userLogin, funcWallet, USER_LOGIN, QUERY_COINS };
