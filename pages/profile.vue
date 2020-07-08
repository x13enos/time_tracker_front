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
            :error-messages="$formErrorMessage('name', ['required'])"
            :disabled="formSubmitting"
            required
          />

          <v-text-field
            v-model="$v.form.email.$model"
            :label="$t('profile.email')"
            :error-messages="$formErrorMessage('email', ['required', 'email'])"
            @keydown="$formErrorMessageCleanUp('email')"
            :disabled="formSubmitting"
            required
          />

          <v-select
            v-model="form.locale"
            :label="$t('profile.locale')"
            :items="localeList()"
            :disabled="formSubmitting"
            required
          />

          <v-select
            v-model="form.activeWorkspaceId"
            :label="$t('profile.active_workspace')"
            :items="workspaceList"
            :disabled="formSubmitting"
            required
          />

          <v-text-field
          v-model="$v.form.password.$model"
            :label="$t('profile.new_password')"
            :disabled="formSubmitting"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            :error-messages="$formErrorMessage('password', ['passwordLength'])"
            @click:append="showPassword = !showPassword"
          />
        </v-form>
      </v-col>

    </v-row>

    <template v-if="$config.extensionEnabled">
      <v-divider />

      <v-row>
        <v-col class="col-12">
          <h2>{{ $t("profile.notification_settings") }}</h2>

          <p class="mt-2">
            {{ $t("profile.telegram_token") }}
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <code v-bind="attrs" v-on="on" v-clipboard="user.telegramToken" @click="updateSnack({ message: $t('profile.token_was_copied'), color: 'success' })">{{ user.telegramToken }}</code>
              </template>
              <span>{{ $t('profile.click_for_copy') }}</span>
            </v-tooltip>
            <span v-if="user.telegramActive">
              - {{ $t("profile.account_was_linked") }} <v-icon class="mr-2" color="success">mdi-check-circle</v-icon>
            </span>
          </p>
        </v-col>
      </v-row>
    </template>

    <v-divider />

    <v-btn
      class="ma-2"
      :loading="formSubmitting"
      :disabled="formSubmitting || !valid"
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

  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import formMixin from '@/mixins/form'
import { required, email, helpers } from 'vuelidate/lib/validators'
import { mapState, mapActions, mapMutations } from 'vuex'
import Clipboard from 'v-clipboard'

export default {

  mixins: [validationMixin, formMixin],

  data() {
    return {
      showPassword: false,
      valid: false,
      workspaceList: [],
      errorMessages: [],
      form: {
        name: "",
        email: "",
        locale: "",
        password: "",
        activeWorkspaceId: ""
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
    this.fetchWorkspaces()
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

    async fetchWorkspaces(){
      const response = await this.$api.allWorkspaces()
      if(response.data){
        this.workspaceList = response.data.map((w) => {
          return { text: w.name, value: w.id }
        })
      }
    },

    async save() {
      await this.$formSubmit(
        () => { return this.updateUserProfile(handleFormParams(this.form)) },
        this.successCallback(),
        this.errorCallback()
      )
    },

    successCallback() {
      return () => {
        this.updateSnack({ message: this.$t("profile.was_updated_succesfully"), color: "green" });
        this.form.password = ""
      }
    },

    errorCallback() {
      return () => {
        this.updateSnack({ message: this.$t("profile.was_not_updated_succesfully"), color: "red" });
      }
    }
  }
}

function handleFormParams(formData) {
  const { name, email, locale, password } = formData
  return {
    name,
    email,
    locale,
    password,
    active_workspace_id: formData.activeWorkspaceId
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
