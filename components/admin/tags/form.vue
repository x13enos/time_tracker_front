<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <span v-on="on">
        <slot />
      </span>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">{{ newTag ? $t("tags.new_tag") : $t("tags.change_details") }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>

          <v-form
          ref="form"
          v-model="valid">
            <v-row>
              <v-col cols="12">
                <v-text-field
                :label="$t('tags.name')"
                v-model.trim="$v.form.name.$model"
                :error-messages="$formErrorMessage('name', ['required'])"
                @keydown="$formErrorMessageCleanUp('name')"
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
          @click="newTag ? create() : update()"
          :disabled="!valid || !form.name">
          {{ $t(`${ newTag ? "create" : "update" }`)}}
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
      tag: {
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
          name: this.tag.name || "",
        }
      }
    },

    validations: {
      form: {
        name: { required }
      }
    },

    computed: {
      newTag(){
        return this.$appMethods.isEmpty(this.tag)
      }
    },

    methods: {
      ...mapMutations(["updateSnack"]),

      async create(){
        await this.$formSubmit(
          () => { return this.$api.createTag(this.form) },
          this.successCreatedCallback(),
          this.errorCallback(this.$t("tags.was_not_created"))
        )
      },

      async update(){
        await this.$formSubmit(
          () => { return this.$api.updateTag(this.tag.id, this.form) },
          this.successUpdatedCallback(),
          this.errorCallback(this.$t("tags.was_not_updated"))
        )
      },

      successCreatedCallback() {
        return (data) => {
          this.updateSnack({ message: this.$t("tags.was_created"), color: "green" });
          this.dialog = false
          this.form = { name: "" }
          this.$emit("processData", data)
          this.$nextTick(() => { this.$v.$reset() })
        }
      },

      successUpdatedCallback() {
        return (data) => {
          this.updateSnack({ message: this.$t("tags.was_updated"), color: "green" })
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
