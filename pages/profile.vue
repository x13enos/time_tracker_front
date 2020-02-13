<template>
  <div>
    <h1>
      {{ $t("profile.title") }}
    </h1>

    <v-row>
      <v-col cols="3">
        <v-form
        ref="form"
        v-model="valid">
          <v-text-field
            v-model="form.name"
            :label="$t('profile.name')"
            :rules="nameRules"
            :disabled="updating"
          />

          <v-text-field
            v-model="form.email"
            :label="$t('profile.email')"
            :rules="emailRules"
            :disabled="updating"
            required
          />

          <v-select
            v-model="form.timezone"
            :label="$t('profile.timezone')"
            :items="timezoneList"
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
            v-model="form.password"
            :label="$t('profile.new_password')"
            :disabled="updating"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            :rules="passwordRules"
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
import Constants from "@/services/constants";
import { mapState, mapActions, mapMutations } from 'vuex'

export default {

  data() {
    return {
      updating: false,
      showPassword: false,
      valid: true,
      nameRules: [
        v => !!v || this.$t('profile.name_is_required'),
      ],
      emailRules: [
        v => !!v || this.$t('profile.email_is_required'),
        v => /.+@.+\..+/.test(v) || this.$t('profile.email_must_be_valid'),
      ],
      passwordRules: [
        v => (!v || (!!v && (v || "").length >= 8)) || this.$t("profile.password_should_contain"),
      ],
      form: {
        name: "",
        email: "",
        locale: "",
        timezone: "",
        password: ""
      }
    }
  },

  mounted(){
    window.g = this;
    Object.assign(this.form, this.user)
  },

  computed: {
    ...mapState(["user"]),

    timezoneList(){
      return Object.keys(Constants.TIMEZONES).map((key) => {
        return { text: Constants.TIMEZONES[key], value: key }
      });
    }
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
