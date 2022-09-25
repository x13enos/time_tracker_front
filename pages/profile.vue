<template>
  <div>
    <h1 class="row main-content-container title-block mt-1">
      {{ $t("profile.title") }}
    </h1>

   <div class="main-content-container content-block mt-8">
      <v-row class="my-2">
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
              v-model="form.timezone"
              label="Timezone"
              :items="timezoneList()"
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

      <v-divider />

      <v-row class="my-2">
        <v-col class="col-12">
          <h2>{{ $t("profile.notification_settings.title") }}</h2>

          <p v-if="$config.extensionEnabled" class="mt-2">
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

          <h3>{{ $t("profile.notification_settings.email") }}:</h3>
          <notification-settings v-model="form.emailSettings" typeOfNotifications="email" />

          <template v-if="$config.extensionEnabled && user.telegramActive">
            <h3>{{ $t("profile.notification_settings.telegram") }}:</h3>
            <notification-settings v-model="form.telegramSettings" typeOfNotifications="telegram" />
          </template>
        </v-col>
      </v-row>

      <v-divider class="mb-2" />

      <v-btn
        class="my-2"
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
  </div>
</template>

<script>
import NotificationSettings from "~/components/profile/notification_settings.vue";
import { validationMixin } from 'vuelidate';
import formMixin from '@/mixins/form';
import { TIMEZONES } from "@/services/constants";
import { required, email, helpers } from 'vuelidate/lib/validators';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {

  head() {
    return {
      title: this.$t('page_titles.profile')
    }
  },

  mixins: [validationMixin, formMixin],
  components: {
    "notification-settings": NotificationSettings
  },

  data() {
    return {
      showPassword: false,
      valid: false,
      errorMessages: [],
      form: {
        name: "",
        email: "",
        locale: "",
        timezone: "",
        password: "",
        emailSettings: [],
        telegramSettings: []
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

  created(){
    Object.assign(this.form, this.user)
    this.form.emailSettings = this.user.notificationSettings.filter((v) => v.indexOf("email") > -1)
    if (this.$config.extensionEnabled)
      this.form.telegramSettings = this.user.notificationSettings.filter((v) => v.indexOf("telegram") > -1)
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

    timezoneList(){
      return Object.keys(TIMEZONES).map((key) => {
        return { text: TIMEZONES[key], value: key }
      });
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
  const { name, email, locale, timezone } = formData
  const password = formData.password === "" ? null : formData.password
  return {
    name,
    email,
    locale,
    timezone,
    password,
    notification_rules: [...formData.emailSettings, ...formData.telegramSettings]
  }
}

const passwordLength = (value) => {
  return !helpers.req(value) || (value.length >= 8 && value.length <= 32);
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
