<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <span v-on="on">
        <slot />
      </span>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">{{ newWorkspace ? $t("workspaces.new_workspace") : $t("workspaces.change_details") }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>

          <v-form
          ref="form"
          v-model="valid">
            <v-row>
              <v-col cols="12">
                <v-text-field
                :label="$t('workspaces.name')"
                v-model.trim="$v.form.name.$model"
                :error-messages="$validationErrorMessage($v.form.name, ['required'])"
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
          @click="newWorkspace ? create() : update()"
          :disabled="!valid || !form.name">
          {{ $t(`${ newWorkspace ? "create" : "update" }`)}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import validationErrorMixin from '@/mixins/validation_errors'
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'
  import { mapMutations } from 'vuex'

  export default {
    mixins: [validationMixin, validationErrorMixin],

    props: {
      workspace: {
        type: Object,
        required: false,
        default: () => { return {} }
      }
    },

    data() {
      return {
        valid: false,
        dialog: false,
        errorMessage: "",
        form: {
          name: this.workspace.name || "",
        }
      }
    },

    validations: {
      form: {
        name: { required }
      }
    },

    computed: {
      newWorkspace(){
        return this.$appMethods.isEmpty(this.workspace)
      }
    },

    methods: {
      ...mapMutations(["updateSnack"]),

      async create(){
        try {
          this.errorMessage = ""
          const response = await this.$api.createWorkspace(this.form)
          this.dialog = false
          this.updateSnack({ message: this.$t("workspaces.was_created"), color: "green" })
          this.form = { name: "" }
          this.$emit("processData", response.data)
        } catch(error) {
          this.errorMessage = error
        }
      },

      async update(){
        try {
          this.errorMessage = ""
          const response = await this.$api.updateWorkspace(this.workspace.id, this.form)
          this.dialog = false
          this.updateSnack({ message: this.$t("workspaces.was_updated"), color: "green" })
          this.$emit("processData", response.data)
        } catch(error) {
          this.errorMessage = error
        }
      }
    }
  }
</script>
