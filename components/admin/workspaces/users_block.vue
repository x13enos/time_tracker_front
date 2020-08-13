<template>
  <v-dialog
    @keydown.esc="dialog = false"
    v-model="dialog"
    persistent
    max-width="600px">
    <template v-slot:activator="{ on }">
      <span v-on="on">
        <v-btn
          class="ma-2"
          color="success"
          small
        >
        {{ $t('workspaces.manage_users') }}
        </v-btn>
      </span>
    </template>
    <v-card>
      <v-card-title class='justify-space-between'>
        <span class="headline">{{ $t("workspaces.users_management") }}</span>
        <v-btn
          v-if="!newUser"
          :small="true"
          class="ma-2"
          color="success"
          @click="newUser = true"
        >
        {{ $t('add') }}
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-container>

          <v-row v-if="newUser">
            <v-col cols="10">
              <v-form @submit.prevent v-model="valid">
                <v-text-field
                  label="Email"
                  v-model.trim="$v.email.$model"
                  :error-messages="$formErrorMessage('email', ['required', 'email', 'workspaceAlreadyContainsUser'])"
                  :dense="true" />
              </v-form>
            </v-col>
            <v-col cols="2" align="end">
              <v-btn
                color="success"
                fab
                x-small
                :disabled="!email || !valid"
                @click="inviteUser">
                <v-icon>mdi-account-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <v-divider v-if="newUser" />


          <v-row class='active-user' v-for="user in users" :key="user.id">
            <v-col cols="4">
              {{ user.name }}
            </v-col>
            <v-col cols="4">
              {{ user.email }}
            </v-col>
            <v-col v-if="appropriateUser(user)" cols="4" align="end">
              <v-btn
                color="error"
                fab
                x-small
                darke
                @click="removeUser(user)">
                <v-icon>mdi-account-remove</v-icon>
              </v-btn>
            </v-col>
          </v-row>

        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">{{ $t("close") }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import formMixin from '@/mixins/form'

  import { validationMixin } from 'vuelidate'
  import { required, email } from 'vuelidate/lib/validators'

  const contains = (param) =>
    (value) => {
      return !param.some(u => u.email === value);
    };


  export default {
    mixins: [validationMixin, formMixin],

    props: {
      workspace: {
        type: Object,
        required: true
      }
    },

    data() {
      return {
        newUser: false,
        dialog: false,
        email: null,
        valid: false,
        users: []
      }
    },

    validations() {
      return {
        email: {
          required,
          email,
          workspaceAlreadyContainsUser: contains(this.users)
        }
      }
    },

    watch: {
      dialog: function(value) {
        if(value)
          this.fetchUsersByWorkspace()
      }
    },

    methods: {
      appropriateUser(user){
        return this.$store.state.user.id !== user.id && user.role !== 'owner'
      },

      async fetchUsersByWorkspace() {
        const response = await this.$api.getUsersByWorkspace(this.workspace.id)
        if(response.data)
          this.users = response.data
      },


      async removeUser(deletedUser){
        const response = await this.$api.removeUserFromWorkspace(this.workspace.id, deletedUser.id)
        if(response.data){
          this.users = this.users.filter(user => user.id !== deletedUser.id)
        }
      },

      async inviteUser(){
        const response = await this.$api.inviteUser(this.workspace.id, this.email)
        if(response.data){
          this.users.push(response.data)
          this.closeDialogOfInvitingUser()
        }
      },

      closeDialogOfInvitingUser() {
        this.newUser = false
        this.email = null
      },

      closeDialog() {
        this.closeDialogOfInvitingUser()
        this.dialog = false
      }
    }
  }
</script>

<style>
  .active-user div{
    font-weight: 700;
  }
</style>
