<template>
  <v-dialog
    @keydown.esc="dialog = false"
    v-model="dialog"
    persistent
    max-width="600px">
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
            @submit.prevent
            v-model="valid">
            <v-row>
              <v-col cols="12">
                <v-text-field
                :label="$t('workspaces.name')"
                v-model.trim="$v.form.name.$model"
                @keyup.enter.prevent="submit"
                :error-messages="$formErrorMessage('name', ['required'])"
                required />
              </v-col>
            </v-row>
          </v-form>

        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">{{ $t("close") }}</v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="submit"
          :disabled="!valid || !form.name">
          {{ $t(`${ newWorkspace ? "create" : "update" }`)}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import formMixin from '@/mixins/form'

  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'
  import { mapMutations } from 'vuex'

  export default {
    mixins: [validationMixin, formMixin],

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
      ...mapMutations([
        "updateSnack",
        "addWorkspaceToUserInfo",
        "changeWorkspaceInfo"
      ]),

      async create(){
        this.errorMessage = ""
        const response = await this.$api.createWorkspace(this.form)
        this.dialog = false
        this.updateSnack({ message: this.$t("workspaces.was_created"), color: "green" })
        this.form = { name: "" }
        this.$emit("processData", response.data)
        this.addWorkspaceToUserInfo(response.data)
        this.$nextTick(() => { this.$v.$reset() })
      },

      async update(){
        this.errorMessage = ""
        const response = await this.$api.updateWorkspace(this.workspace.id, this.form)
        this.dialog = false
        this.updateSnack({ message: this.$t("workspaces.was_updated"), color: "green" })
        this.changeWorkspaceInfo(response.data)
        this.$emit("processData", response.data)
      },

      submit(){
        this.newWorkspace ? this.create() : this.update()
      },
    }
  }
</script>
