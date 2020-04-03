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
                v-model="form.name"
                :rules="[() => !!form.name || $t('projects.name_is_required')]"
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
          @click="save"
          :disabled="!valid">
          {{ $t(`${ newProject ? "create" : "update" }`)}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: {
      project: {
        type: Object,
        retuired: false,
        default: () => { return {} }
      }
    },

    data() {
      return {
        valid: false,
        dialog: false,
        form: {
          name: this.project.name || ""
        }
      }
    },

    computed: {
      newProject(){
        return this.$appMethods.isEmpty(this.project)
      }
    },

    methods: {
      save(){
        this.dialog = false
        this.$emit("processData", this.form)
        if(this.newProject)
          this.form = { name: "" }
      }
    }
  }
</script>