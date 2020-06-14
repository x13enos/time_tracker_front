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
                :error-messages="$formErrorMessage('name', ['required'])"
                @keydown="$formErrorMessageCleanUp('name')"
                required />
              </v-col>

              <v-col cols="12">
                <v-text-field
                :label="$t('projects.regexp_of_grouping')"
                :error-messages="$formErrorMessage('regexp_of_grouping')"
                @keydown="$formErrorMessageCleanUp('regexp_of_grouping')"
                v-model.trim="$v.form.regexp_of_grouping.$model"/>
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
          @click="newProject ? create() : update()"
          :disabled="!valid || !form.name">
          {{ $t(`${ newProject ? "create" : "update" }`)}}
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
        form: {
          name: this.project.name || "",
          regexp_of_grouping: this.project.regexp_of_grouping || ""
        }
      }
    },

    validations: {
      form: {
        name: { required },
        regexp_of_grouping: {}
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
        await this.$formSubmit(
          () => { return this.$api.createProject(this.form) },
          this.successCreatedCallback(),
          this.errorCallback(this.$t("projects.was_not_created"))
        )
      },

      async update(){
        await this.$formSubmit(
          () => { return this.$api.updateProject(this.project.id, this.form) },
          this.successUpdatedCallback(),
          this.errorCallback(this.$t("projects.was_not_updated"))
        )
      },

      successCreatedCallback() {
        return (data) => {
          this.updateSnack({ message: this.$t("projects.was_created"), color: "green" });
          this.dialog = false
          this.form = { name: "", regexp_of_grouping: "" }
          this.$emit("processData", data)
          this.$nextTick(() => { this.$v.$reset() })
        }
      },

      successUpdatedCallback() {
        return (data) => {
          this.updateSnack({ message: this.$t("projects.was_updated"), color: "green" })
          this.dialog = false
          this.$emit("processData", data)
        }
      },

      errorCallback(message) {
        return () => {
          this.updateSnack({ message, color: "red" });
        }
      }
    }
  }
</script>
