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

      <nuxt-link to="/tasks">
        <v-btn text>
          {{ $t("navigation.tasks") }}
        </v-btn>
      </nuxt-link>

      <nuxt-link to="/reports">
        <v-btn text>
          {{ $t("navigation.reports") }}
        </v-btn>
      </nuxt-link>

      <nuxt-link to="/admin/projects">
        <v-btn text>
          {{ $t("navigation.projects") }}
        </v-btn>
      </nuxt-link>

      <nuxt-link to="/profile">
        <v-btn icon>
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </nuxt-link>

      <v-btn icon>
        <v-icon @click="signOut">
          mdi-logout
        </v-icon>
      </v-btn>
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

<style scoped>
  .v-application a{
    text-decoration: none;
  }
</style>
