<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-coach="saveCoach"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '@/components/coaches/CoachForm.vue';
import BaseCard from '@/components/ui/BaseCard.vue';

export default {
  components: {
    CoachForm,
    BaseCard,
  },
  methods: {
    saveCoach(newCoach) {
      this.$store.dispatch('coaches/registerCoach', newCoach);
      this.$router.replace('/coaches');
    },
  },
};
</script>
