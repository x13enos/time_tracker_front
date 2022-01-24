<template>
  <div>
    <v-card class="elevation-12">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>
          {{ $t('invitation.title') }}
        </v-toolbar-title>

        <v-spacer />
        <locale-selector />
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
          {{ $t('invitation.sign_up') }}
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
      title: this.$t('page_titles.sign_up')
    }
  },

  mixins: [validationMixin, formMixin],

  components: {
    "additional-links": AdditionalLinks,
    "locale-selector": LocaleSelector
  },

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
      errorMessages: {}
    }
  },

  methods: {
    async submit () {
      this.errorMessages = {}
      try {
        await this.$api.setPassword({
          token: this.$route.query.token,
          name: this.form.name,
          password: this.form.password
        })
        this.$router.push('/');
      } catch ({ errors }) {
        this.errorMessages = errors
      }
    }
  }
}

const passwordLength = (value) => {
  return !helpers.req(value) || (value.length >=8 && value.length <= 32);
};
</script>
