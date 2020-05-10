<template>
  <v-card v-if="dataWasUpdated" class="elevation-12">
    <v-card-text>
      <p>You successfully updated your data.</p>
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
        {{ $t('password-set.title') }}
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form v-model="valid">
        <v-text-field
          v-model.trim="$v.form.name.$model"
          :label="$t('password-set.name')"
          type="text"
          :error-messages="$validationErrorMessage($v.form.name, ['required'])"
        />
        <v-text-field
          id="password"
          v-model.trim="$v.form.password.$model"
          :label="$t('password-set.password')"
          type="password"
          :error-messages="$validationErrorMessage($v.form.password, ['required', 'passwordLength'])"
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
        :disabled="!valid || !this.form.name || !this.form.password">
        {{ $t('continue') }}
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
        name: { required },
        password: {
          required,
          passwordLength
        }
      }
    }
  },

  data () {
    return {
      form: {
        name: "",
        password: ""
      },
      valid: true,
      errorMessage: '',
      dataWasUpdated: false
    }
  },

  methods: {
    async submit () {
      this.errorMessage = ""
      try {
        const response = await this.$api.setPassword({
          token: this.$route.query.token,
          name: this.form.name,
          password: this.form.password
        })
        this.dataWasUpdated = true
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
