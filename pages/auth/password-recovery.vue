<template>
  <div>
    <v-card class="elevation-4">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>
          {{ $t('password_recovery.title') }}
        </v-toolbar-title>

        <v-spacer />
        <locale-selector />
      </v-toolbar>
      <v-card-text>
        <v-form
          @submit.prevent
          v-model="valid">
          <v-text-field
            v-model.trim="$v.email.$model"
            :label="$t('password_recovery.email')"
            type="email"
            @keyup.enter.prevent="submit"
            :error-messages="$formErrorMessage('email', ['required', 'email'])"
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
          @click="submit"
          :disabled="!valid || !this.email">
          {{ $t('password_recovery.reset_password') }}
        </v-btn>
      </v-card-actions>

    </v-card>

    <v-card class="elevation-4 mt-3 auth-card">
      <v-card-text class="d-flex justify-center auth-links-block">
        <nuxt-link to="/auth/sign-in">
          {{ $t('navigation.login') }}
        </nuxt-link>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import formMixin from '@/mixins/form'

import LocaleSelector from "~/components/auth/locale_selector.vue"
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { mapMutations } from 'vuex'

export default {
  layout: 'auth',

  mixins: [validationMixin, formMixin],
  components: {
    "locale-selector": LocaleSelector
  },
  validations: {
    email: {
      required, email
    }
  },

  data () {
    return {
      email: "",
      valid: true,
      errorMessages: {}
    }
  },

  computed: {
    emailErrors () {
      const attribute = this.$v.email
      const errors = []
      if (!attribute.$dirty) return errors
      !attribute.email && errors.push(this.$t('validations.email_must_be_valid'))
      return errors
    },
  },

  methods: {
    ...mapMutations(["updateSnack"]),

    async submit () {
      this.errorMessages = {}
      try {
        await this.$api.forgotPassword(this.email)
        this.updateSnack({ message: this.$t("password_recovery.we_sent_email"), color: "green" })
        this.email = ""
        this.$nextTick(() => { this.$v.$reset() })
      } catch (errors) {
        this.errorMessages = errors;
      }
    }
  }
}
</script>

<style>
 .auth-links-block a {
   text-decoration: none;
 }

 .auth-links-block {
   padding: 0.5rem;
 }
</style>
