<template>
  <v-card v-if="dataWasUpdated" class="elevation-12">
    <v-card-text>
      <p>You succesfully updated your data.</p>
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
        {{ $t('invitation.title') }}
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form v-model="valid">
        <v-text-field
          v-model.trim="$v.form.name.$model"
          :label="$t('invitation.name')"
          type="text"
          :error-messages="$formErrorMessage('name', ['required'])"
        />
        <v-text-field
          v-model.trim="$v.form.password.$model"
          :label="$t('invitation.password')"
          type="password"
          :error-messages="$formErrorMessage('password', ['required', 'passwordLength'])"
        />
        <v-text-field
          v-model.trim="$v.form.confirmPassword.$model"
          :label="$t('invitation.confirm_password')"
          type="password"
          :error-messages="$formErrorMessage('confirmPassword', ['required', 'sameAsPassword'])"
        />
      </v-form>
      <span class='red--text' v-if="!!errorMessages.base">
        {{ errorMessages.base }}
      </span>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        :block="true"
        @click="submit()"
        :disabled="!valid || !this.form.name || !this.form.password || !this.form.confirmPassword">
        {{ $t('invitation.accept_invitation') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import formMixin from '@/mixins/form'

import { validationMixin } from 'vuelidate'
import { required, helpers, sameAs } from 'vuelidate/lib/validators'

export default {
  layout: 'auth',

  mixins: [validationMixin, formMixin],

  validations() {
    return {
      form: {
        name: { required },
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
        name: "",
        password: "",
        confirmPassword: ""
      },
      valid: true,
      errorMessages: {},
      dataWasUpdated: false
    }
  },

  methods: {
    async submit () {
      this.errorMessages = {}
      try {
        const response = await this.$api.setPassword({
          token: this.$route.query.token,
          name: this.form.name,
          password: this.form.password
        })
        this.dataWasUpdated = true
      } catch ( errors ) {
        this.errorMessages = errors
      }
    }
  }
}

const passwordLength = (value) => {
  return !helpers.req(value) || (value.length >=8 && value.length <= 32);
};
</script>
