<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <span v-on="on">
        <slot />
      </span>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">{{ $t("projects.new_project") }}</span>
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
                :error-messages="nameErrors"
                required />
              </v-col>

              <v-col cols="12">
                <v-text-field
                :label="$t('projects.regexp_of_grouping')"
                v-model="form.regexp_of_grouping"/>
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
          @click="save"
          :disabled="!valid || !form.name">
          {{ $t(`${ newProject ? "create" : "update" }`)}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

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
        name: { required }
      }
    },

    computed: {
      newProject(){
        return this.$appMethods.isEmpty(this.project)
      },

      nameErrors(){
        const attribute = this.$v.form.name
        const errors = []
        if (!attribute.$dirty) return errors
        !attribute.required && errors.push(this.$t('validations.required'))
        return errors
      }
    },

    methods: {
      save(){
        this.dialog = false
        this.$emit("processData", this.form)
        if(this.newProject)
          this.form = {
            name: "",
            regexp_of_grouping: ""
          }
      }
    }
  }
</script>
