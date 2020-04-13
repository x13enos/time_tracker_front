<template>
  <div>
    <h1>
      {{ $t('users.title') }}
      <user-form @processData="addUser">
        <v-btn
          class="ma-2"
          color="success"
        >
        {{ $t('add') }}
        </v-btn>
      </user-form>
    </h1>


    <div v-if="users.length">
      <v-simple-table>
        <thead>
          <tr>
            <th class="text-left">{{ $t("users.name") }}</th>
            <th class="text-left">{{ $t("users.email") }}</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td align="right">
              <v-btn
                v-if="user.id !== $store.state.user.id"
                color="error"
                fab
                x-small
                dark
                @click="markUserAsPendingDelete(user.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </div>

    <v-dialog v-model="deleteDialog" max-width="450">
      <v-card>
        <v-card-title class="headline">{{ $t("are_you_sure") }}</v-card-title>
        <v-card-text>
          {{ $t("users.approve_deleting") }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="deleteUser">
            {{ $t("yes") }}
          </v-btn>
          <v-btn color="blue darken-1" text @click="deleteDialog = false">
            {{ $t("cancel") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import UserForm from "@/components/admin/users/form"

export default {
  components: {
    'user-form': UserForm
  },

  data() {
    return {
      users: [],
      deleteDialog: false,
      deletingUserId: null
    }
  },

  mounted(){
    this.fetchUsers();
  },

  methods: {

    async fetchUsers(){
      const response = await this.$api.allUsers()
      if(response.data)
        this.users = response.data
    },

    addUser(data){
      this.users.push(data)
    },

    markUserAsPendingDelete(id){
      this.deletingUserId = id
      this.deleteDialog = true
    },

    async deleteUser(){
      this.deleteDialog = false
      const response = await this.$api.deleteUser(this.deletingUserId)
      if(response.data){
        const userIndex = this.users.findIndex(u => u.id === this.deletingUserId)
        this.$delete(this.users, userIndex)
      }
    }

  }
}
</script>

<style>
</style>
