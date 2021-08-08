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
              <img  src="/images/toime.svg" alt="Toime"/>
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
    <template v-slot:append>
      <v-subheader class="workspace-title">{{ $t("navigation.workspace") }}</v-subheader>
      <div>
        <v-menu
          v-model="menuOpened"
          :close-on-content-click="true"
          nudge-top="8"
          offset-x
        >
          <template v-slot:activator="{ on }">
            <div class="d-flex workspace-button justify-space-between" v-on="on">
              {{ activeWorkspace.name }}
              <v-icon dense>mdi-chevron-down</v-icon>
            </div>
          </template>
          <v-container fluid class="workspaces-menu">
            <div v-for="workspace in user.workspaces" :key="workspace.id">
              <div class="d-flex justify-space-between workspace-link" @click="changeWorkspace(workspace.id)">
                {{ workspace.name }}
                <span v-if="workspace.id === user.activeWorkspaceId" >
                  {{ $t("profile.active_workspace") }}
                  <v-icon color="green">mdi-checkbox-marked</v-icon>
                </span>
              </div>
            </div>
            <hr>
            <nuxt-link to="/workspaces" class="manage">
              {{ $t("workspaces.manage") }}
            </nuxt-link>
          </v-container>
        </v-menu>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["isManager"]),

    isMobile(){
      return this.$vuetify.breakpoint.smAndUp;
    },

    activeWorkspace(){
      return this.user.workspaces.find((w) => w.id === this.user.activeWorkspaceId)
    }
  },

  data: () => ({
    drawer: false,
    menuOpened: false
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
    color: #222222;
    font-weight: 400;
    font-size: 14px;
  }

  .workspace-button{
    border-radius: 5px;
    margin: 0.25rem 1rem 1rem 1rem;
    padding: 0.25rem 0.5rem;
    border: 1px solid #E0E0E0;
    cursor: pointer;
  }

  .workspace-button:hover {
    border: 1px solid #66C5B6;
  }

  .workspaces-menu {
    background-color: white;
    border-radius: 5px;
  }

  .workspaces-menu hr{
    margin: 0.5rem 0;
    border-top: 1px solid #E0E0E0;
    height: 0px;
  }

  .manage {
    display: block;
    width: 100%;
    text-align: center;
  } 

  .manage:hover {
    background-color: #E0E0E0;
  } 

  .workspace-link {
    cursor: pointer;
  }

  .navbar .v-subheader {
    height: 24px;
  }

  .group-items .v-list-item {
    min-height: 36px;
  }

  .workspace-title {
    font-size: 12px;
  }
</style>
