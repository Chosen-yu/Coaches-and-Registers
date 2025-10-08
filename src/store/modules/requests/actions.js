export default {
  async addRequest(context, payload) {
    try {
      const userId = payload.id;
      const newRequest = {
        email: payload.email,
        message: payload.message,
      };

      const response = await fetch(
        `https://vue-https-demo-f55b8-default-rtdb.firebaseio.com/requests/${userId}.json`,
        {
          method: 'POST',
          body: JSON.stringify(newRequest),
        }
      );
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || 'there is something wrong in URL...');
      }

      newRequest.id = data.name;
      newRequest.coachId = userId;

      context.commit('addRequest', newRequest);
    } catch (err) {
      console.error(err);
      context.commit('error', err.message);
    }
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.newid;
    const token = context.rootGetters.token;
    try {
      const response = await fetch(
        `https://vue-https-demo-f55b8-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=` +
          token
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error('there is something wrong in URL...');
      }
      const newRequests = [];
      for (const key in data) {
        newRequests.push({
          id: key,
          coachId,
          email: data[key].email,
          message: data[key].message,
        });
      }
      context.commit('fetchRequests', newRequests);
    } catch (err) {
      console.error(err);
      context.commit('error', err.message);
    }
  },
  refreshError(context) {
    context.commit('refreshError');
  },
};
