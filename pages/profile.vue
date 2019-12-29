<template>
  <div>
    <h1>
      Profile settings
    </h1>

    <v-row>
      <v-col cols="3">
        <v-form
        ref="form"
        v-model="valid">
          <v-text-field
            v-model="form.name"
            label="Name"
            :rules="nameRules"
            :disabled="updating"
          />

          <v-text-field
            v-model="form.email"
            label="Email"
            :rules="emailRules"
            :disabled="updating"
            required
          />

          <v-select
            v-model="form.timezone"
            label="Timezone"
            :items="timezoneList"
            :disabled="updating"
            required
          />

          <v-text-field
            v-model="form.password"
            label="New Password"
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
          Save
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
import { mapState, mapActions } from 'vuex'

export default {

  data() {
    return {
      updating: false,
      showPassword: false,
      valid: true,
      nameRules: [
        v => !!v || 'Name is required',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => (!v || (!!v && (v || "").length > 8)) || 'Password should contain at least 8 characters',
      ],
      form: {
        name: null,
        email: null,
        timezone: null,
        password: null
      }
    }
  },

  mounted(){
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
    ...mapActions(["updateUserProfile"]),

    async save(){
      this.updating = true
      const response = await this.updateUserProfile(this.form)
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
