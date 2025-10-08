export default {
  registerCoach(state, payload) {
    state.coaches.push(payload);
    state.isRegister = true;
  },
  loadCoaches(state, payload) {
    state.coaches = payload;
  },
  error(state, payload) {
    state.error = payload;
  },
  refreshError(state) {
    state.error = null;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  },
};
