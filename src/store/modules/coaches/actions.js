export default {
  async registerCoach(context, payload) {
    const userId = context.rootGetters.newid;
    const token = context.rootGetters.token;
    const newCoach = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      areas: payload.areas,
      description: payload.description,
      hourlyRate: payload.hourlyRate,
    };
    console.log(newCoach);

    const response = await fetch(
      `https://vue-https-demo-f55b8-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=` +
        token,
      {
        method: 'PUT',
        body: JSON.stringify(newCoach),
      }
    );

    // const data=response.JSON();

    if (!response.ok) {
      console.log('there is something wrong!');
      return;
    }

    context.commit('registerCoach', {
      ...newCoach,
      id: userId,
    });
  },

  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) return;
    try {
      //1,fetch data
      const response = await fetch(
        'https://vue-https-demo-f55b8-default-rtdb.firebaseio.com/coaches.json'
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error('There is something wrong in URL!');
      }

      //load data
      const fetchCoaches = [];
      for (const key in data) {
        fetchCoaches.push({
          id: key,
          firstName: data[key].firstName,
          lastName: data[key].lastName,
          areas: data[key].areas,
          description: data[key].description,
          hourlyRate: data[key].hourlyRate,
        });
      }

      context.commit('loadCoaches', fetchCoaches);
      context.commit('setFetchTimestamp');
    } catch (error) {
      console.error('Error message context:', error);
      context.commit('error', error.message);
    }
  },
  refreshError(context) {
    context.commit('refreshError');
  },
};
