<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <span v-on="on">
        <span>{{ userNames }}</span>
        <span v-if="assignedUsers.length > 2">... +{{ assignedUsers.length - 2 }}</span>
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
              <v-form v-model="valid">
                <v-text-field
                  label="Email"
                  v-model.trim="$v.email.$model"
                  :error-messages="emailErrors"
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


          <v-row class='active-user' v-for="user in assignedUsers" :key="user.id">
            <v-col cols="4">
              {{ user.name }}
            </v-col>
            <v-col cols="4">
              {{ user.email }}
            </v-col>
            <v-col v-if="isNotCurrentUser(user)" cols="4" align="end">
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
  import { validationMixin } from 'vuelidate'
  import { required, email } from 'vuelidate/lib/validators'

  const contains = (param) =>
    (value) => {
      return !param.some(u => u.email == value);
    };


  export default {
    mixins: [validationMixin],

    props: {
      workspace: {
        type: Object,
        required: true
      },

      allUsers: {
        type: Array,
        required: true
      },
    },

    data() {
      return {
        newUser: false,
        dialog: false,
        email: null,
        valid: false
      }
    },

    validations() {
      return {
        email: {
          required,
          email,
          contains: contains(this.assignedUsers)
        }
      }
    },

    computed: {
      assignedUsers: function(){
        return this.allUsers.filter((user) => {
          return this.workspace.user_ids.includes(user.id)
        })
      },

      userNames: function() {
        const names = this.assignedUsers.map((u) => u.name )
        return names.sort().slice(0, 2).join(', ')
      },

      emailErrors(){
        const attribute = this.$v.email
        const errors = []
        if (!attribute.$dirty) return errors
        !attribute.required && errors.push(this.$t('validations.required'))
        !attribute.email && errors.push(this.$t('validations.email_must_be_valid'))
        !attribute.contains && errors.push(this.$t('validations.already_invited'))
        return errors
      }
    },

    methods: {
      isNotCurrentUser(user){
        return this.$store.state.user.id !== user.id
      },

      async removeUser(user){
        const response = await this.$api.removeUserFromWorkspace(this.workspace.id, user.id)
        if(response.data){
          this.$emit("updateListOfUsers", "remove", user.id)
        }
      },

      async inviteUser(){
        const response = await this.$api.inviteUser(this.workspace.id, this.email)
        if(response.data){
          this.$emit("updateListOfUsers", "assign", response.data)
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
