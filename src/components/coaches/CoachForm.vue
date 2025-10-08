<template>
  <form @submit.prevent="submit">
    <div class="form-control" :class="{ invalid: !firstName.isVaild }">
      <label for="firstName">FirstName</label>
      <input
        type="text"
        id="firstName"
        v-model.trim="firstName.val"
        @blur="clearValidity('firstName')"
      />
      <p v-if="!firstName.isVaild">FirstName must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isVaild }">
      <label for="lastName">LastName</label>
      <input
        type="text"
        id="lastName"
        v-model.trim="lastName.val"
        @blur="clearValidity('lastName')"
      />
      <p v-if="!lastName.isVaild">LastName must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isVaild }">
      <label for="description">Description</label>
      <textarea
        id="description"
        rows="5"
        v-model.trim="description.val"
        @blur="clearValidity('description')"
      ></textarea>
      <p v-if="!description.isVaild">Description must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !hourlyRate.isVaild }">
      <label for="rate">Hourly Rate</label>
      <input
        type="number"
        id="rate"
        v-model.number="hourlyRate.val"
        @blur="clearValidity('hourlyRate')"
      />
      <p v-if="!hourlyRate.isVaild">HourlyRate must be greater than 0.</p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.isVaild }">
      <h3>Areas of Expertise</h3>
      <div>
        <input
          id="frontend"
          type="checkbox"
          value="frontend"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="frontend">Frontend</label>
      </div>
      <div>
        <input
          id="backend"
          type="checkbox"
          value="backend"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="backend">Backend</label>
      </div>
      <div>
        <input
          id="career"
          type="checkbox"
          value="career"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="career">Career</label>
      </div>
      <p v-if="!areas.isVaild">At least one Expertise must be selected.</p>
    </div>
    <p v-if="!formIsValid">Please fix the above errors and submit again!</p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
import BaseButton from '../ui/BaseButton.vue';
export default {
  components: { BaseButton },
  emits: ['save-coach'],
  data() {
    return {
      firstName: {
        val: '',
        isVaild: true,
      },
      lastName: {
        val: '',
        isVaild: true,
      },
      areas: {
        val: [],
        isVaild: true,
      },
      description: {
        val: '',
        isVaild: true,
      },
      hourlyRate: {
        val: null,
        isVaild: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isVaild = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.firstName.val === '') {
        this.formIsValid = false;
        this.firstName.isVaild = false;
      }
      if (this.lastName.val === '') {
        this.formIsValid = false;
        this.lastName.isVaild = false;
      }
      if (this.description.val === '') {
        this.formIsValid = false;
        this.description.isVaild = false;
      }
      if (!this.hourlyRate.val || this.hourlyRate.val < 0) {
        this.formIsValid = false;
        this.hourlyRate.isVaild = false;
      }
      if (this.areas.val.length === 0) {
        this.formIsValid = false;
        this.areas.isVaild = false;
      }
    },
    submit() {
      //validation
      this.validateForm();
      if (!this.formIsValid) return;

      const newCoach = {
        firstName: this.firstName.val,
        lastName: this.lastName.val,
        areas: this.areas.val,
        description: this.description.val,
        hourlyRate: this.hourlyRate.val,
      };
      this.$emit('save-coach', newCoach);
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
