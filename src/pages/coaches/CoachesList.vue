<template>
  <div>
    <base-dialog
      :show="!!isError"
      title="Data fetch has wrong!"
      @close="handleError"
    >
      <p>there is something wrong in url</p>
    </base-dialog>
    <section>
      <coach-filter @change-filters="setFilters"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >Refresh</base-button
          >
          <base-button v-if="!isLogin" link to="/auth"
            >Login to Register as a Coach
          </base-button>
          <base-button
            v-if="isLogin && !isRegister && !isLoading"
            link
            to="/register"
            >Register as Coach
          </base-button>
        </div>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :areas="coach.areas"
            :rate="coach.hourlyRate"
          ></coach-item>
        </ul>
        <p v-else>No Coaches Found!</p>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from '@/components/coaches/CoachItem.vue';
import CoachFilter from '@/components/coaches/CoachFilter.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseSpinner from '@/components/ui/BaseSpinner.vue';

export default {
  components: {
    CoachItem,
    BaseButton,
    CoachFilter,
    BaseSpinner,
  },
  data() {
    return {
      isLoading: false,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
    isError() {
      return this.$store.getters['coaches/isError'];
    },
    isRegister() {
      return this.$store.getters['coaches/isRegister'];
    },
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    setFilters(newFilters) {
      this.activeFilters = newFilters;
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      await this.$store.dispatch('coaches/loadCoaches', {
        forceRefresh: refresh,
      });
      this.isLoading = false;
    },
    handleError() {
      this.$store.dispatch('coaches/refreshError');
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
