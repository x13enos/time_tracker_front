<template>
  <div>
    <v-app-bar
      color="primary"
      :dark="true"
    >
      <v-app-bar-nav-icon class="d-flex d-sm-none" @click="drawer = true" />

      <v-toolbar-title>
        Time Tracker
      </v-toolbar-title>

      <div class="flex-grow-1" />

      <template v-if="isMobile">
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

        <nuxt-link v-if="isAdmin" to="/admin/projects">
          <v-btn text>
            {{ $t("navigation.projects") }}
          </v-btn>
        </nuxt-link>

        <nuxt-link v-if="isAdmin" to="/admin/users">
          <v-btn text>
            {{ $t("navigation.users") }}
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
      </template>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :light="true"
      absolute
      temporary>
      <v-list
        nav
        dense>
        <v-list-item-group
          active-class="primary--text text--accent-4"
        >

          <nuxt-link to="/tasks">
            <v-list-item>
              <v-list-item-title>
                 {{ $t("navigation.tasks") }}
              </v-list-item-title>
            </v-list-item>
          </nuxt-link>

          <nuxt-link to="/reports">
            <v-list-item>
              <v-list-item-title>
                {{ $t("navigation.reports") }}
              </v-list-item-title>
            </v-list-item>
          </nuxt-link>

          <nuxt-link to="/admin/projects">
            <v-list-item v-if="isAdmin">
              <v-list-item-title>
                {{ $t("navigation.projects") }}
              </v-list-item-title>
            </v-list-item>
          </nuxt-link>

          <nuxt-link to="/admin/users">
            <v-list-item v-if="isAdmin">
              <v-list-item-title>
                {{ $t("navigation.users") }}
              </v-list-item-title>
            </v-list-item>
          </nuxt-link>

          <v-divider />

          <nuxt-link to="/profile">
            <v-list-item>
                <v-list-item-title>
                  {{ $t("navigation.profile") }}
                </v-list-item-title>
            </v-list-item>
          </nuxt-link>

          <v-list-item @click="signOut">
              <v-list-item-title>
                {{ $t("navigation.sign_out") }}
              </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(["isAdmin"]),

    isMobile(){
      return this.$vuetify.breakpoint.smAndUp;
    }
  },

  data: () => ({
    drawer: false,
  }),

  methods: {
    async signOut(){
      await this.$api.signOut()
      this.$router.push("/auth/sign-in")
    }
  }
}
</script>

<style scoped>
  .v-application a{
    text-decoration: none;
  }
</style>
