export default {
  addRequest(state, payload) {
    state.requests.push(payload);
  },
  error(state, payload) {
    state.error = payload;
  },
  fetchRequests(state, payload) {
    state.requests = payload;
  },
  refreshError(state) {
    state.error = null;
  },
};
