<template>
  <v-dialog
    @keydown.esc="dialog = false"
    v-model="dialog"
    persistent
    max-width="600px">
    <template v-slot:activator="{ on }">
      <span v-on="on">
        <span>{{ userNames }}</span>
        <span v-if="assignedUsers.length > 2">... +{{ assignedUsers.length - 2 }}</span>
        <v-btn
          class="ma-2"
          color="success"
          small
        >
        {{ $t('projects.manage_users') }}
        </v-btn>
      </span>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">{{ $t("projects.users_management") }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>


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

          <v-row v-for="user in notAssignedUsers" :key="user.id">
            <v-col cols="4">
              {{ user.name }}
            </v-col>
            <v-col cols="4">
              {{ user.email }}
            </v-col>
            <v-col cols="4" align="end">
              <v-btn
                color="success"
                fab
                x-small
                dark
                @click="assignUser(user)">
                <v-icon>mdi-account-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>

        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">{{ $t("close") }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: {
      project: {
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
        dialog: false
      }
    },

    computed: {
      assignedUsers: function(){
        return this.allUsers.filter((user) => {
          return this.project.user_ids.includes(user.id)
        })
      },

      notAssignedUsers: function(){
        return this.allUsers.filter((user) => {
          return !this.project.user_ids.includes(user.id)
        })
      },

      userNames: function() {
        const names = this.assignedUsers.map((u) => u.name )
        return  names.sort().slice(0, 2).join(', ')
      }
    },

    methods: {
      isNotCurrentUser(user){
        return this.$store.state.user.id !== user.id
      },

      async removeUser(user){
        const response = await this.$api.removeUserFromProject(this.project.id, user.id)
        if(response.data){
          this.$emit("updateListOfUsers", "remove", user.id)
        }
      },

      async assignUser(user){
        const response = await this.$api.assignUserToProject(this.project.id, user.id)
        if(response.data){
          this.$emit("updateListOfUsers", "assign", user.id)
        }
      }
    }
  }
</script>

<style>
  .active-user div{
    font-weight: 700;
  }
</style>
