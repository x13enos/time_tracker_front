<template>
  <div>
    <v-card v-if="passwordWasChanged" class="elevation-4">
      <v-card-text>
        <p>{{ $t('password-reset.password_was_updated') }}</p>
        {{ $t('password-reset.go_to_login_page') }}
      </v-card-text>
    </v-card>
    <v-card v-else class="elevation-4">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>
          {{ $t('password-reset.title') }}
        </v-toolbar-title>

        <v-spacer />
        <locale-selector />
      </v-toolbar>
      <v-card-text>
        <v-form
          @submit.prevent
          v-model="valid">
          <v-text-field
            v-model.trim="$v.form.password.$model"
            :label="$t('password-reset.password')"
            type="password"
            @keyup.enter.prevent="submit"
            :error-messages="$formErrorMessage('password', ['required', 'passwordLength'])"
          />
          <v-text-field
            id="password"
            v-model.trim="$v.form.confirmPassword.$model"
            :label="$t('password-reset.confirm_password')"
            type="password"
            @keyup.enter.prevent="submit"
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
          :disabled="!valid || !this.form.password || !this.form.confirmPassword">
          {{ $t('password-reset.create_new_password') }}
        </v-btn>
      </v-card-actions>
    </v-card>

    <additional-links link="home" />
  </div>
</template>

<script>
import formMixin from '@/mixins/form'

import LocaleSelector from "~/components/auth/locale_selector.vue"
import AdditionalLinks from  "~/components/auth/additional_links.vue"
import { validationMixin } from 'vuelidate'
import { required, helpers, sameAs } from 'vuelidate/lib/validators'

export default {
  layout: 'auth',

  head() {
    return {
      title: this.$t('page_titles.password_reset')
    }
  },

  mixins: [validationMixin, formMixin],
  components: {
    "locale-selector": LocaleSelector,
    "additional-links": AdditionalLinks
  },
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
      errorMessages: {},
      passwordWasChanged: false
    }
  },

  methods: {
    async submit () {
      this.errorMessages = {}
      try {
        const response = await this.$api.changePassword({
          token: this.$route.query.token,
          password: this.form.password
        })
        this.passwordWasChanged = true
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

<style>
 .auth-links-block a {
   text-decoration: none;
 }

 .auth-links-block {
   padding: 0.5rem;
 }
</style>
