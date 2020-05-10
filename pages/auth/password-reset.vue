<template>
  <v-card v-if="passwordWasChanged" class="elevation-12">
    <v-card-text>
      <p>Your password was successfully updated.</p>
      <p>Please go to the login page and try to authorise.</p>
      <nuxt-link to="/auth/sign-in">
        <v-btn :block="true" class="primary" text>
          {{ $t("navigation.login") }}
        </v-btn>
      </nuxt-link>
    </v-card-text>
  </v-card>
  <v-card v-else class="elevation-12">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>
        {{ $t('password-reset.title') }}
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form v-model="valid">
        <v-text-field
          v-model.trim="$v.form.password.$model"
          :label="$t('password-reset.password')"
          type="password"
          :error-messages="$validationErrorMessage($v.form.password, ['required', 'passwordLength'])"
        />
        <v-text-field
          id="password"
          v-model.trim="$v.form.confirmPassword.$model"
          :label="$t('password-reset.confirm_password')"
          type="password"
          :error-messages="$validationErrorMessage($v.form.confirmPassword, ['required', 'sameAsPassword'])"
        />
      </v-form>
      <span class='red--text' v-if="errorMessage">
        {{ errorMessage }}
      </span>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        :block="true"
        @click="submit()"
        :disabled="!valid || !this.form.password || !this.form.confirmPassword">
        {{ $t('password-reset.create_new_password') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import validationErrorMixin from '@/mixins/validation_errors'
import { validationMixin } from 'vuelidate'
import { required, helpers, sameAs } from 'vuelidate/lib/validators'

export default {
  layout: 'auth',

  mixins: [validationMixin, validationErrorMixin],

  validations() {
    return {
      form: {
        password: {
          required,
          passwordLength
        },
        confirmPassword: {
          required,
          sameAsPassword: sameAs('password')
        }
      }
    }
  },

  data () {
    return {
      form: {
        password: "",
        confirmPassword: ""
      },
      valid: true,
      errorMessage: '',
      passwordWasChanged: false
    }
  },

  methods: {
    async submit () {
      this.errorMessage = ""
      try {
        const response = await this.$api.changePassword({
          token: this.$route.query.token,
          password: this.form.password
        })
        this.passwordWasChanged = true
      } catch ( error ) {
        this.errorMessage = error
      }
    }
  }
}

const passwordLength = (value) => {
  return !helpers.req(value) || (value.length >=8 && value.length <= 32);
};
</script>
