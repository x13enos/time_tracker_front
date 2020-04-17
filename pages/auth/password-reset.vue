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
          :error-messages="passwordErrors"
        />
        <v-text-field
          id="password"
          v-model.trim="$v.form.confirmPassword.$model"
          :label="$t('password-reset.confirm_password')"
          name="password"
          type="password"
          :error-messages="confirmPasswordErrors"
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
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'

export default {
  layout: 'auth',

  mixins: [validationMixin],

  validations: {
    form: {
      password: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(32)
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs('password')
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

  computed: {
    passwordErrors () {
      const attribute = this.$v.form.password
      const errors = []
      if (!attribute.$dirty) return errors
      if(!attribute.minLength || !attribute.maxLength){
        errors.push(this.$t('validations.length_between', { min: '8', max: '32' }))
      }
      !attribute.required && errors.push(this.$t('validations.required'))
      return errors
    },
    confirmPasswordErrors () {
      const attribute = this.$v.form.confirmPassword
      const errors = []
      if (!attribute.$dirty) return errors
      !attribute.sameAsPassword && errors.push(this.$t('validations.should_be_same_as_password'))
      !attribute.required && errors.push(this.$t('validations.required'))
      return errors
    },
  },

  methods: {
    async submit () {
      this.errorMessage = ""
      try {
        await this.$api.changePassword({
          token: this.$route.query.token,
          password: this.form.password,
          confirm_password: this.form.confirmPassword
        })
        this.passwordWasChanged = true
      } catch ( error ) {
        this.errorMessage = error
      }
    }
  }
}
</script>
