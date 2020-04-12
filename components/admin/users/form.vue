<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <span v-on="on">
        <slot />
      </span>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">{{ $t("users.new_user") }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>

          <v-form
          ref="form"
          v-model="valid">
            <v-row>
              <v-col cols="12">
                <v-text-field
                :label="$t('users.name')"
                v-model.trim="$v.form.name.$model"
                :error-messages="nameErrors"
                required />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-text-field
                :label="$t('users.email')"
                v-model.trim="$v.form.email.$model"
                :error-messages="emailErrors"
                required />
              </v-col>
            </v-row>
          </v-form>

          <span class='red--text' v-if="errorMessage">
            {{ errorMessage }}
          </span>

        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">{{ $t("close") }}</v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="save"
          :disabled="!this.form.name || !this.form.email || !valid">
          {{ $t("add") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations } from 'vuex'
  import { validationMixin } from 'vuelidate'
  import { required, email } from 'vuelidate/lib/validators'

  export default {
    data() {
      return {
        valid: false,
        dialog: false,
        errorMessage: "",
        form: {
          name: "",
          email: ""
        }
      }
    },

    mixins: [validationMixin],

    validations: {
      form: {
        name: { required },
        email: { required, email },
      }
    },


    computed: {
      nameErrors () {
        const attribute = this.$v.form.name
        const errors = []
        if (!attribute.$dirty) return errors
        !attribute.required && errors.push(this.$t('validations.required'))
        return errors
      },
      emailErrors () {
        const attribute = this.$v.form.email
        const errors = []
        if (!attribute.$dirty) return errors
        !attribute.email && errors.push(this.$t('validations.email_must_be_valid'))
        !attribute.required && errors.push(this.$t('validations.required'))
        return errors
      },
    },

    methods: {
      ...mapMutations(["updateSnack"]),

      async save(){
        try {
          this.errorMessage = ""
          const response = await this.$api.createUser(this.form)
          this.$emit("processData", response.data)
          this.updateSnack({ message: this.$t("users.invitation_email_was_sent"), color: "green" })
          this.dialog = false
          this.form = { name: "", email: "" }
        } catch (error) {
          this.errorMessage = error
        }
      }
    }
  }
</script>
