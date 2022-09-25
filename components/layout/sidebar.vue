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
            <v-icon class="mr-2 green-icon">mdi-clock-time-four</v-icon>
            <nuxt-link to="/tasks">{{ $t("navigation.tasks") }}</nuxt-link>
      </v-list-item>
      <div class="group-items mt-2">
        <v-subheader>{{ $t("navigation.analyze") }}</v-subheader>
        <!-- <v-list-item>
          <v-icon class="mr-2 green-icon">mdi-view-dashboard</v-icon>
          <nuxt-link to="/tasks">Dashboard</nuxt-link>
        </v-list-item> -->
        <v-list-item>
          <v-icon class="mr-2 green-icon">mdi-chart-box</v-icon>
          <nuxt-link to="/reports">{{ $t("navigation.reports") }}</nuxt-link>
        </v-list-item>
      </div>
      <div class="group-items mt-4" v-if="isManager" >
        <v-subheader>{{ $t("navigation.manage") }}</v-subheader>
        <v-list-item>
          <v-icon class="mr-2 green-icon">mdi-folder</v-icon>
          <nuxt-link to="/admin/projects">{{ $t("navigation.projects") }}</nuxt-link>
        </v-list-item>
        <v-list-item>
          <v-icon class="mr-2 green-icon">mdi-account-multiple</v-icon>
          <nuxt-link to="/admin/users">{{ $t("navigation.users") }}</nuxt-link>
        </v-list-item>
        <v-list-item>
          <v-icon dense class="mr-2 green-icon">mdi-tag-multiple</v-icon>
          <nuxt-link to="/admin/tags">{{ $t("navigation.tags") }}</nuxt-link>
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
          <div fluid class="workspaces-menu">
            <div class="d-flex justify-space-between pt-5 pb-4 px-5">
              <span class="workspace-title">{{ $t("workspaces.title") }}</span>
              <nuxt-link to="/workspaces">
                <v-icon dense class="green-icon">mdi-cog</v-icon>
              </nuxt-link>
            </div>
            <div 
              v-for="workspace in user.workspaces"
              :key="workspace.id"
              class="py-2 px-6 workspace-item"
              :class="{ 'workspace-active-item': workspace.id === user.activeWorkspaceId }">
              <div class="d-flex justify-space-between cursor-pointer" @click="changeWorkspace(workspace.id)">
                {{ workspace.name }}
                <span v-if="workspace.id === user.activeWorkspaceId" class="font-green workspace-active" >
                  {{ $t("profile.active_workspace") }}
                </span>
              </div>
            </div>
          </div>
        </v-menu>
      </div>
      <div>
        <v-menu
          v-model="profileOpened"
          :close-on-content-click="true"
          nudge-top="8"
          offset-x
        >
          <template v-slot:activator="{ on }">
            <div
              :class="{ active: profileOpened }"
              class="d-flex user-data py-2 px-4 mb-5" 
              v-on="on">
              <div class="d-flex align-center avatar text-uppercase rounded-circle">
                <div>{{ avatarInitials() }}</div>
              </div>
              <div class="ml-2 d-flex flex-column">
                <div v-if="user.name" class="user-name">{{ user.name }}</div>
                <div class="user-email">{{ user.email }}</div>
              </div>
            </div>
          </template>
          <div fluid class="workspaces-menu">
            <div class="d-flex py-4 px-5 justify-space-between profile-section">
              <div class="d-flex flex-column">
                <div v-if="user.name" class="user-name">{{ user.name }}</div>
                <div class="user-email mt-1">{{ user.email }}</div>
              </div>
              <div class="d-flex align-center big-avatar text-uppercase rounded-circle">
                <div class="mx-auto">{{ avatarInitials() }}</div>
              </div>
            </div>
            <nuxt-link to="/profile" class="d-flex menu-link py-2 pl-5">
              <v-icon dense class="green-icon">mdi-cog</v-icon>
              <span class="ml-2 profile-link-title">{{ $t("navigation.profile") }}</span>
            </nuxt-link>
            <div class="d-flex cursor-pointer menu-link py-2 pl-5" @click="signOut">
              <v-icon dense class="green-icon">mdi-logout-variant</v-icon>
              <span class="ml-2 profile-link-title">{{ $t("navigation.sign_out") }}</span>
            </div>
          </div>
        </v-menu>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["isManager"]),

    activeWorkspace(){
      return this.user.workspaces.find((w) => w.id === this.user.activeWorkspaceId);
    }
  },

  data: () => ({
    drawer: false,
    menuOpened: false,
    profileOpened: false
  }),

  methods: {
    ...mapMutations(["updatePersonalInfo", "updateSnack"]),
    ...mapActions(["changeWorkspace"]),

    async signOut(){
      await this.$api.signOut()
      this.$router.push("/auth/sign-in")
    },

    avatarInitials() {
      if (this.user.name)
        return this.user.name.split(' ').map((n) => n[0]).join('').toUpperCase();

      if (this.user.email)
        return this.user.email.slice(0, 2).toUpperCase();
    }
  }
}
</script>

<style lang="scss" scoped>
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
    min-width: 16rem;
    background-color: white;
    border-radius: 5px;
  }

  .manage {
    display: block;
    width: 100%;
    text-align: center;
  } 

  .manage:hover {
    background-color: #E0E0E0;
  } 

  .cursor-pointer {
    cursor: pointer;
  }

  .navbar .v-subheader {
    height: 24px;
  }

  .group-items .v-list-item {
    min-height: 36px;
  }

  .workspace-title {
    font-size: 0.75rem;
    color: #828282;
  }

  .workspace-item, .menu-link {
    font-size: 0.875rem;
  }

  .workspace-item:hover, .menu-link:hover {
    background-color:  $gray-color-6;
  }

  .profile-link-title {
    margin-top: 1px;
  }

  .green-icon {
    color: $font-green;
  }

  .workspaces-menu .workspace-active-item {
    background-color: rgba(102, 197, 182, 0.1);
  }

  .workspace-active {
    font-size: 0.75rem;
  }

  .user-data {
    cursor: pointer;
  }

  .user-data:hover, .user-data.active  {
    background-color: #FAFAFA;
  }

  .user-name {
    font-size: 14px;
    line-height: 16.8px;
    font-weight: 500;
  }

  .user-email {
    font-size: 10px;
    line-height: 12px;
    font-weight: 400;
    color: #828282;
  }

  .avatar {
    padding: 6px 8px;
    width: 28px;
    height: 28px;
    font-size: 10px;
    line-height: 12px;
    font-weight: 600;
    color: #FFFFFF;
    background-color: #4BBBA9;
  }

  .big-avatar {
    padding: 7px;
    width: 34px;
    height: 34px;
    font-size: 12px;
    line-height: 20px;
    font-weight: 600;
    color: #FFFFFF;
    background-color: #4BBBA9;
  }
</style>
