<template>
  <div>
    <v-app-bar
      color="primary"
      :dark="true"
    >
      <v-toolbar-title>
        Time Tracker
      </v-toolbar-title>

      <div class="flex-grow-1" />

      <v-toolbar-items>
        <v-btn text>
          Tasks
        </v-btn>
      </v-toolbar-items>

      <template>
        <v-btn icon>
          <v-icon>
            mdi-account-circle
          </v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon @click="signOut">
            mdi-logout
          </v-icon>
        </v-btn>
      </template>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  methods: {
    async signOut(){
      await this.$api.signOut()
      this.$router.push("/auth/sign-in")
    },
  }
}
</script>
