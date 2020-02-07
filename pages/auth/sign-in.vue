<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Login form</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form v-model="valid">
        <v-text-field
          v-model="form.email"
          label="Email"
          name="email"
          type="email"
          :rules="emailRules"
        />
        <v-text-field
          id="password"
          v-model="form.password"
          label="Password"
          name="password"
          type="password"
        />
      </v-form>
      <span class='red--text' v-if="errorMessage">
        {{ errorMessage }}
      </span>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="onSubmit()" :disabled="!valid || !form.password">
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  layout: 'auth',

  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      valid: true,
      errorMessage: '',
      emailRules: [
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    }
  },

  methods: {
    ...mapMutations([ "updatePersonalInfo" ]),

    async onSubmit () {
      this.errorMessage = "";
      try {
        const response = await this.$api.signIn(this.form);
        this.updatePersonalInfo(response.data);
        this.$router.replace({ path: '/tasks' });
      } catch ( error ) {
        this.errorMessage = error;
      }
    }
  }
}
</script>
