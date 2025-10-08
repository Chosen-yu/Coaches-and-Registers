export default {
  requests(state, _, _2, rootgetters) {
    return state.requests.filter(
      (request) => request.coachId === rootgetters.newid
    );
  },
  hasRequests(state, getters) {
    return getters.requests && getters.requests.length > 0;
  },
  isError(state) {
    return state.error;
  },
};
