<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>
        {{ $t('login_form.title') }}
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form v-model="valid">
        <v-text-field
          v-model="form.email"
          :label="$t('login_form.email')"
          name="email"
          type="email"
          :rules="emailRules"
        />
        <v-text-field
          id="password"
          v-model="form.password"
          :label="$t('login_form.password')"
          name="password"
          type="password"
        />
      </v-form>
      <span class='red--text' v-if="errorMessage">
        {{ errorMessage }}
      </span>
    </v-card-text>
    <v-card-actions class="d-flex pa-2 justify-space-between">
      <v-btn color="primary" @click="onSubmit()" :disabled="!valid || !form.password">
        {{ $t('login_form.login') }}
      </v-btn>

      <nuxt-link class="forgot-link" to="/auth/password-recovery">
          {{ $t("login_form.forgot_password") }}
      </nuxt-link>
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
        v => /.+@.+\..+/.test(v) || this.$t('login_form.email_must_be_valid'),
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

<style scoped>
  .forgot-link {
    text-decoration: none;
  }
</style>
