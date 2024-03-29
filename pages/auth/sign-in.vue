<template>
  <div>
    <v-card class="elevation-4">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>
          {{ $t('sign_in_form.title') }}
        </v-toolbar-title>

        <v-spacer />
        <locale-selector />
      </v-toolbar>
      <v-card-text>
        <v-form
          @submit.prevent
          v-model="valid">
          <v-text-field
            v-model.trim="$v.form.email.$model"
            :label="$t('sign_in_form.email')"
            type="email"
            @keyup.enter.prevent="onSubmit"
            :error-messages="$formErrorMessage('email', ['required', 'email'])"
          />
          <v-text-field
            id="password"
            v-model.trim="$v.form.password.$model"
            :label="$t('sign_in_form.password')"
            type="password"
            @keyup.enter.prevent="onSubmit"
            :error-messages="$formErrorMessage('password', ['required'])"
          />
        </v-form>
        <span class='red--text' v-if="!!errorMessages.base">
          {{ errorMessages.base }}
        </span>
        <v-checkbox
          v-model="form.rememberMe"
          :label="$t('sign_in_form.remember_me')" />
      </v-card-text>
      <v-card-actions class="d-flex pa-2 justify-space-between">
        <v-btn color="primary" @click="onSubmit()" :disabled="!valid || !form.email || !form.password">
          {{ $t('sign_in_form.login') }}
        </v-btn>

        <nuxt-link class="forgot-link" to="/auth/password-recovery">
            {{ $t("sign_in_form.forgot_password") }}
        </nuxt-link>
      </v-card-actions>
    </v-card>

    <additional-links link="sign-up" />
  </div>
</template>

<script>
import formMixin from '@/mixins/form'

import LocaleSelector from "~/components/auth/locale_selector.vue"
import AdditionalLinks from  "~/components/auth/additional_links.vue"
import { validationMixin } from 'vuelidate'
import { email, required } from 'vuelidate/lib/validators'
import { mapMutations } from 'vuex'

export default {
  layout: 'auth',
  name: 'Login',

  head() {
    return {
      title: this.$t('page_titles.sign_in')
    }
  },

  components: {
    "locale-selector": LocaleSelector,
    "additional-links": AdditionalLinks
  },

  mixins: [validationMixin, formMixin],

  data () {
    return {
      form: {
        email: '',
        password: '',
        rememberMe: false
      },
      valid: false,
      errorMessages: {}
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
      this.errorMessage = {};
      try {
        const response = await this.$api.signIn(this.handledFormData());
        this.updatePersonalInfo(response.data);
        this.$router.replace({ path: '/tasks' });
      } catch ({ errors }) {
        this.errorMessages = errors;
      }
    },

    handledFormData() {
      const { email, password } = this.form
      return {
        email,
        password,
        remember_me: this.form.rememberMe
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
