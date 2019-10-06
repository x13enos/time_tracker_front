<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Login form</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="form.email"
          label="Login"
          name="login"
          type="text"
        />
        <v-text-field
          id="password"
          v-model="form.password"
          label="Password"
          name="password"
          type="password"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="onSubmit()">
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
      errorMessage: ''
    }
  },

  mounted: function(){
    localStorage.setItem('authToken', undefined)
  },

  methods: {
    ...mapMutations([ "updateUserData" ]),

    async onSubmit () {
      const response = await this.$api.signIn(this.form);
      if (response.success()) {
        this.updateUserData(response.data);
        localStorage.setItem('authToken', response.data.token);
        this.$router.replace({ path: '/' });
      } else {
        this.errorMessage = response.errors;
      }
    }
  }
}
</script>
