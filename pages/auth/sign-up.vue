<template>
  <div>
    <v-card class="elevation-4">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>
          {{ $t('sign_up_form.title') }}
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
            :label="$t('sign_up_form.email')"
            type="email"
            @keyup.enter.prevent="onSubmit"
            :error-messages="$formErrorMessage('email', ['required', 'email'])"
          />
          <v-text-field
            id="password"
            v-model.trim="$v.form.password.$model"
            :label="$t('sign_up_form.password')"
            type="password"
            @keyup.enter.prevent="onSubmit"
            :error-messages="$formErrorMessage('password', ['required'])"
          />
        </v-form>
        <span class='red--text' v-if="!!errorMessages.base">
          {{ errorMessages.base }}
        </span>
      </v-card-text>
      <v-card-actions class="d-flex pa-2 justify-center">
        <v-btn
          class="sign-up-button"
          color="primary"
          @click="onSubmit()"
          :disabled="!valid || !form.email || !form.password">
          {{ $t('sign_up_form.submit') }}
        </v-btn>
      </v-card-actions>
    </v-card>

    <additional-links link="sign-in" />
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
  name: 'SignUp',

  head() {
    return {
      title: this.$t('page_titles.sign_up')
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
        password: ''
      },
      valid: false
    }
  },

  watch: {
    "form.email": function() { this.errorMessages["email"] = "" },
    "form.password": function() { this.errorMessages["password"] = "" }
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
      this.errorMessages = {};
      try {
        const response = await this.$api.signUp(this.form);
        this.updatePersonalInfo(response.data);
        this.$router.push('/tasks');
      } catch ({ errors }) {
        this.errorMessages = errors;
      }
    }
  }
}
</script>

<style scoped>
  .sign-up-button {
    width: 100%;
  }
</style>
