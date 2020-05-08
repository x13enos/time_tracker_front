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
            v-model="form.locale"
            :label="$t('profile.locale')"
            :items="localeList()"
            :disabled="updating"
            required
          />

          <v-select
            v-model="form.activeWorkspaceId"
            :label="$t('profile.active_workspace')"
            :items="workspaceList"
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
import { mapState, mapActions, mapMutations } from 'vuex'

export default {

  data() {
    return {
      updating: false,
      showPassword: false,
      valid: true,
      workspaceList: [],
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
        password: "",
        activeWorkspaceId: ""
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

    async save(){
      this.updating = true
      const response = await this.updateUserProfile(handleFormParams(this.form))
      this.updateSnack({ message: this.$t("profile.was_updated_succesfully"), color: "green" })
      this.form.password = ""
      this.updating = false
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
