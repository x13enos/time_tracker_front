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
            <v-list-item v-if="isManager">
              <v-list-item-title>
                {{ $t("navigation.projects") }}
              </v-list-item-title>
            </v-list-item>
          </nuxt-link>

          <nuxt-link to="/admin/users">
            <v-list-item v-if="isManager">
              <v-list-item-title>
                {{ $t("navigation.users") }}
              </v-list-item-title>
            </v-list-item>
          </nuxt-link>

          <nuxt-link to="/admin/tags">
            <v-list-item v-if="isManager">
              <v-list-item-title>
                {{ $t("navigation.tags") }}
              </v-list-item-title>
            </v-list-item>
          </nuxt-link>

          <v-divider />

          <nuxt-link to="/workspaces">
            <v-list-item>
              <v-list-item-title>
                {{ $t("navigation.workspaces") }}:
              </v-list-item-title>
            </v-list-item>
          </nuxt-link>

          <v-list-item v-for="workspace in user.workspaces" :key="workspace.id">
            <v-list-item-content>
              <v-list-item-title>
                <a @click="changeWorkspace(workspace.id)">
                  {{ workspace.name }}
                </a>
                <span v-if="workspace.id === user.activeWorkspaceId" >
                  {{ $t("profile.active_workspace") }}
                  <v-icon color="green">mdi-checkbox-marked</v-icon>
                </span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

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
import { mapGetters, mapState, mapMutations } from 'vuex'

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

    async signOut(){
      await this.$api.signOut()
      this.$router.push("/auth/sign-in")
    },

    async changeWorkspace(workspaceId){
      await this.$api.changeActiveWorkspaceId(workspaceId)
      this.$router.go();
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
</style>
