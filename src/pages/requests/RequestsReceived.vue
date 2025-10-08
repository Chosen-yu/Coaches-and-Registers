<template>
  <section>
    <base-dialog
      :show="!!isError"
      title="Data fetch has wrong!"
      @close="handleError"
    >
      <p>there is something wrong in url</p>
    </base-dialog>
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>
      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-else-if="hasRequest && !isLoading">
        <requests-item
          v-for="request in requests"
          :key="request.id"
          :email="request.email"
          :message="request.message"
        ></requests-item>
      </ul>
      <h3 v-else>You haven't received any requests yet!</h3>
    </base-card>
  </section>
</template>

<script>
import RequestsItem from '@/components/requests/RequestsItem.vue';

export default {
  components: {
    RequestsItem,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    isError() {
      return this.$store.getters['requests/isError'];
    },
    requests() {
      return this.$store.getters['requests/requests'];
    },
    hasRequest() {
      return this.$store.getters['requests/hasRequests'];
    },
  },
  created() {
    this.fetchRequests();
  },
  methods: {
    async fetchRequests() {
      this.isLoading = true;
      await this.$store.dispatch('requests/fetchRequests');
      this.isLoading = false;
    },
    handleError() {
      this.$store.dispatch('requests/refreshError');
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
