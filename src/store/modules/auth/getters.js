export default {
  newid(state) {
    return state.userId;
  },
  token(state) {
    return state.token;
  },
  isLogin(state) {
    return !!state.token;
  },
  didLogout(state) {
    return state.didLogout;
  },
};
