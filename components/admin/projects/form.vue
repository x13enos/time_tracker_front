<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <span v-on="on">
        <slot />
      </span>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">{{ newProject ? $t("projects.new_project") : $t("projects.change_details") }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>

          <v-form
          ref="form"
          v-model="valid">
            <v-row>
              <v-col cols="12">
                <v-text-field
                :label="$t('projects.name')"
                v-model.trim="$v.form.name.$model"
                :error-messages="$validationErrorMessage($v.form.name, ['required'])"
                required />
              </v-col>

              <v-col cols="12">
                <v-text-field
                :label="$t('projects.regexp_of_grouping')"
                v-model="form.regexp_of_grouping"/>
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
          @click="newProject ? create() : update()"
          :disabled="!valid || !form.name">
          {{ $t(`${ newProject ? "create" : "update" }`)}}
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
      project: {
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
          name: this.project.name || "",
          regexp_of_grouping: this.project.regexp_of_grouping || ""
        }
      }
    },

    validations: {
      form: {
        name: { required }
      }
    },

    computed: {
      newProject(){
        return this.$appMethods.isEmpty(this.project)
      }
    },

    methods: {
      ...mapMutations(["updateSnack"]),

      async create(){
        try {
          this.errorMessage = ""
          const response = await this.$api.createProject(this.form)
          this.dialog = false
          this.updateSnack({ message: this.$t("projects.was_created"), color: "green" })
          this.form = { name: "", regexp_of_grouping: "" }
          this.$emit("processData", response.data)
        } catch(error) {
          this.errorMessage = error
        }
      },

      async update(){
        try {
          this.errorMessage = ""
          const response = await this.$api.updateProject(this.project.id, this.form)
          this.dialog = false
          this.updateSnack({ message: this.$t("projects.was_updated"), color: "green" })
          this.$emit("processData", response.data)
        } catch(error) {
          this.errorMessage = error
        }
      }
    }
  }
</script>
