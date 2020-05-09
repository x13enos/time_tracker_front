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
          v-model.trim="$v.form.email.$model"
          :label="$t('login_form.email')"
          type="email"
          :error-messages="$validationErrorMessage($v.form.email, ['required', 'email'])"
        />
        <v-text-field
          id="password"
          v-model.trim="$v.form.password.$model"
          :label="$t('login_form.password')"
          type="password"
          :error-messages="$validationErrorMessage($v.form.password, ['required'])"
        />
      </v-form>
      <span class='red--text' v-if="errorMessage">
        {{ errorMessage }}
      </span>
    </v-card-text>
    <v-card-actions class="d-flex pa-2 justify-space-between">
      <v-btn color="primary" @click="onSubmit()" :disabled="!valid || !form.email || !form.password">
        {{ $t('login_form.login') }}
      </v-btn>

      <nuxt-link class="forgot-link" to="/auth/password-recovery">
          {{ $t("login_form.forgot_password") }}
      </nuxt-link>
    </v-card-actions>
  </v-card>
</template>

<script>
import validationErrorMixin from '@/mixins/validation_errors'
import { validationMixin } from 'vuelidate'
import { email, required } from 'vuelidate/lib/validators'
import { mapMutations } from 'vuex'

export default {
  layout: 'auth',

  mixins: [validationMixin, validationErrorMixin],

  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      valid: false,
      errorMessage: ''
    }
  },

  validations: {
    form: {
      email: { required, email },
      password: { required }
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
