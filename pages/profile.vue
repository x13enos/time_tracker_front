<template>
  <div>
    <h1>
      {{ $t("profile.title") }}
    </h1>

    <v-row>
      <v-col class="col-sm-3 col-12">
        <v-form
        ref="form"
        v-model="valid">
          <v-text-field
          v-model="$v.form.name.$model"
            :label="$t('profile.name')"
            :error-messages="$validationErrorMessage($v.form.name, ['required'])"
            :disabled="updating"
          />

          <v-text-field
            v-model="$v.form.email.$model"
            :label="$t('profile.email')"
            :error-messages="$validationErrorMessage($v.form.email, ['required', 'email'])"
            :disabled="updating"
            required
          />

          <v-select
            v-model="form.locale"
            :label="$t('profile.locale')"
            :items="localeList()"
            :disabled="updating"
            required
          />

          <v-text-field
          v-model="$v.form.password.$model"
            :label="$t('profile.new_password')"
            :disabled="updating"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            :error-messages="$validationErrorMessage($v.form.password, ['passwordLength'])"
            @click:append="showPassword = !showPassword"
          />
        </v-form>

        <v-btn
          class="ma-2"
          :loading="updating"
          :disabled="updating || !valid"
          color="info"
          @click="save"
        >
          {{ $t('profile.save') }}

          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>mdi-cached</v-icon>
            </span>
          </template>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import validationErrorMixin from '@/mixins/validation_errors'
import { required, email, helpers } from 'vuelidate/lib/validators'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {

  mixins: [validationMixin, validationErrorMixin],

  data() {
    return {
      updating: false,
      showPassword: false,
      valid: false,
      form: {
        name: "",
        email: "",
        locale: "",
        password: ""
      }
    }
  },

  validations() {
    return {
      form: {
        name: { required },
        email: { required, email },
        password: { passwordLength }
      }
    }
  },

  mounted(){
    Object.assign(this.form, this.user)
  },

  computed: {
    ...mapState(["user"]),
  },

  methods: {
    ...mapMutations(["updateSnack"]),
    ...mapActions(["updateUserProfile"]),

    localeList(){
      return [
        { text: "English", value: "en" },
        { text: "Русский", value: "ru" }
      ]
    },

    async save(){
      this.updating = true
      const response = await this.updateUserProfile(this.form)
      this.updateSnack({ message: this.$t("profile.was_updated_succesfully"), color: "green" })
      this.form.password = ""
      this.updating = false
    }
  }
}

const passwordLength = (value) => {
  return !helpers.req(value) || (value.length >=8 && value.length <= 32);
};
</script>

<style scoped>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }

  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
