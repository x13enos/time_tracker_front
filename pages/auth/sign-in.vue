/* istanbul ignore next */
<template>
  <b-container class="bv-example-row bv-example-row-flex-cols">
    <b-row class="mt-5" align-h="center">
      <b-col lg="6" md="8" sm="12">
        <h3>Please sign in to site.</h3>
        <b-form id="sign-in-form">
          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-email"
          >
            <b-form-input
              id="input-email"
              v-model="form.email"
              type="email"
              required
              placeholder="Enter email"
            />
          </b-form-group>

          <b-form-group id="input-group-2" label="Your password:" label-for="input-password">
            <b-form-input
              id="input-password"
              v-model="form.password"
              type="password"
              required
              placeholder="Enter password"
            />
          </b-form-group>

          <div>{{ errorMessage }}</div>
          <b-button id="btn" type="submit" variant="primary" @click.stop.prevent="onSubmit()">
            Sign In
          </b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      errorMessage: ''
    }
  },

  methods: {
    onSubmit () {
      this.$store.dispatch('signIn', this.form).then((response) => {
        if (response.status === 'success') {
          localStorage.setItem('authToken', response.data.token)
          this.$router.replace({ path: '/' })
        } else {
          this.errorMessage = response.errors
        }
      })
    }
  }
}
</script>
