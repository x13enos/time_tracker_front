<template>
  <v-dialog
    @keydown.esc="dialog = false"
    v-model="dialog"
    persistent
    max-width="600px">
    <template v-slot:activator="{ on }">
      <span v-on="on">
        <v-btn
            color="primary"
            fab
            x-small
            dark >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </span>
    </template>
    <v-card>
      <v-card-title class='justify-space-between'>
        <span class="headline">{{ $t("users.change_details") }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form
            ref="form"
            v-model="valid">
            <v-select
              v-model="form.role"
              :label="$t('users.role')"
              :items="roleList()"
              required
            />
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">{{ $t("close") }}</v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="update">
          {{ $t("update") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {

    props: {
      user: {
        type: Object,
        required: true
      }
    },

    data() {
      return {
        dialog: false,
        valid: false,
        form: {
          role: this.user.role,
        }
      }
    },

    methods: {
      ...mapMutations(["updateSnack"]),

      roleList() {
        return [
          { text: this.$t("users.roles.staff"), value: 'staff' },
          { text: this.$t("users.roles.admin"), value: 'admin' }
        ]
      },

      async update() {
        const response = await this.$api.updateUserData(this.user.id, { role: this.form.role })
        if(response.data) {
          this.$emit('updateUserData', response.data)
          this.updateSnack({ message: this.$t("users.details_were_updated"), color: "green" })
          this.dialog = false;
        }
      }
    }

  }
</script>
