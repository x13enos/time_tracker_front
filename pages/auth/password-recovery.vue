<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>
        {{ $t('password_recovery.title') }}
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form v-model="valid">
        <v-text-field
          v-model.trim="$v.email.$model"
          :label="$t('password_recovery.email')"
          type="email"
          :error-messages="$validationErrorMessage($v.email, ['required', 'email'])"
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
        :disabled="!valid || !this.email">
        {{ $t('password_recovery.reset_password') }}
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
import validationErrorMixin from '@/mixins/validation_errors'
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { mapMutations } from 'vuex'

export default {
  layout: 'auth',

  mixins: [validationMixin, validationErrorMixin],

  validations: {
    email: {
      required, email
    }
  },

  data () {
    return {
      email: "",
      valid: true,
      errorMessage: ''
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
      this.errorMessage = ""
      try {
        await this.$api.forgotPassword(this.email)
        this.updateSnack({ message: this.$t("password_recovery.we_sent_email"), color: "green" })
        this.email = ""
        this.$nextTick(() => { this.$v.$reset() })
      } catch ( error ) {
        this.errorMessage = error
      }
    }
  }
}
</script>
