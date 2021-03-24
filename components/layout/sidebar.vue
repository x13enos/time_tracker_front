<template>
  <v-navigation-drawer
    app
    floating
    width="236"
    class="navbar"
  >
    <v-list class="pt-1">
      <v-list-item>
          <v-list-item-content class="text-truncate">
            <nuxt-link to="/tasks">
                Time Tracker
            </nuxt-link>
          </v-list-item-content>
          <v-btn icon x-small>
              <v-icon>mdi-bell</v-icon>
          </v-btn>
      </v-list-item>

      <v-list-item class="mt-4">
            <v-icon dense class="mr-2">mdi-block-helper</v-icon>
            <nuxt-link to="/tasks">{{ $t("navigation.tasks") }}</nuxt-link>
      </v-list-item>
      <div class="group-items mt-2">
        <v-subheader>{{ $t("navigation.analyze") }}</v-subheader>
        <v-list-item>
          <v-icon dense class="mr-2">mdi-block-helper</v-icon>
          <nuxt-link to="/tasks">Dashboard</nuxt-link>
        </v-list-item>
        <v-list-item>
          <v-icon dense class="mr-2">mdi-block-helper</v-icon>
          <nuxt-link to="/reports">{{ $t("navigation.reports") }}</nuxt-link>
        </v-list-item>
      </div>
      <div class="group-items mt-4" v-if="isManager" >
        <v-subheader>{{ $t("navigation.manage") }}</v-subheader>
        <v-list-item>
          <v-icon dense class="mr-2">mdi-block-helper</v-icon>
          <nuxt-link to="/admin/projects">{{ $t("navigation.projects") }}</nuxt-link>
        </v-list-item>
        <v-list-item>
          <v-icon dense class="mr-2">mdi-block-helper</v-icon>
          <nuxt-link to="/admin/users">{{ $t("navigation.users") }}</nuxt-link>
        </v-list-item>
        <v-list-item>
          <v-icon dense class="mr-2">mdi-block-helper</v-icon>
          <nuxt-link to="/admin/tags">{{ $t("navigation.users") }}</nuxt-link>
        </v-list-item>
        <v-list-item>
          <v-icon dense class="mr-2">mdi-block-helper</v-icon>
          <nuxt-link to="/tasks">Clients</nuxt-link>
        </v-list-item>
        <v-list-item>
          <v-icon dense class="mr-2">mdi-block-helper</v-icon>
          <nuxt-link to="/tasks">Settings</nuxt-link>
        </v-list-item>
        <v-list-item>
          <v-icon dense class="mr-2">mdi-block-helper</v-icon>
          <nuxt-link to="/tasks">Help</nuxt-link>
        </v-list-item>
      </div>
    </v-list>

  </v-navigation-drawer>
  <!-- <div>
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

        <nuxt-link v-if="isManager" to="/admin/projects">
          <v-btn text>
            {{ $t("navigation.projects") }}
          </v-btn>
        </nuxt-link>

        <nuxt-link v-if="isManager" to="/admin/users">
          <v-btn text>
            {{ $t("navigation.users") }}
          </v-btn>
        </nuxt-link>

        <nuxt-link v-if="isManager" to="/admin/tags">
          <v-btn text>
            {{ $t("navigation.tags") }}
          </v-btn>
        </nuxt-link>

        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" class="profile-button" v-on="on">
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-list>
              <v-list-item-group>
              <div class="workspaces d-flex">
                {{ $t("profile.workspaces") }}:
                <nuxt-link to="/workspaces" class="ml-3">
                  {{ $t("workspaces.manage") }}
                </nuxt-link>
              </div>
              <v-list-item v-for="workspace in user.workspaces" :key="workspace.id">
                <v-list-item-content @click="changeWorkspace(workspace.id)">
                  <v-list-item-title class="link-color">
                    {{ workspace.name }}
                    <span v-if="workspace.id === user.activeWorkspaceId" >
                      {{ $t("profile.active_workspace") }}
                      <v-icon color="green">mdi-checkbox-marked</v-icon>
                    </span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>

              <nuxt-link to="/profile">
                <v-list-item>
                  <v-list-item-title class="link-color">
                      {{ $t("navigation.profile") }}
                  </v-list-item-title>
                </v-list-item>
              </nuxt-link>


              <v-list-item @click="signOut">
                  <v-list-item-title class="link-color">
                    {{ $t("navigation.sign_out") }}
                  </v-list-item-title>
              </v-list-item>
            </v-list-item-group>
            </v-list>
          </v-card>
        </v-menu>
      </template>
    </v-app-bar> -->
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["isManager"]),

    isMobile(){
      return this.$vuetify.breakpoint.smAndUp;
    }
  },

  data: () => ({
    drawer: false,
  }),

  methods: {
    ...mapMutations(["updatePersonalInfo", "updateSnack"]),
    ...mapActions(["changeWorkspace"]),

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

  a.active {
    color: green;
  }

  .workspaces{
    margin: 5px 15px;
  }

  .profile-button {
    margin-right: 10px;
  }

  .link-color {
    color: #1976d2;
  }

  .navbar .v-subheader {
    height: 24px;
  }

  .group-items .v-list-item {
    min-height: 36px;
  }
</style>
