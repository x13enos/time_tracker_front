<template>
  <div>
    <h1>
      {{ $t('projects.title') }}
      <project-form @processData="createProject">
        <v-btn
          class="ma-2"
          color="success"
        >
        {{ $t('projects.add') }}
        </v-btn>
      </project-form>
    </h1>

    <v-divider />

    <div v-if="projects.length">
      <v-simple-table>
        <thead>
          <tr>
            <th class="text-left">{{ $t("projects.name") }}</th>
            <th class="text-left">{{ $t("projects.users") }}</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in projects" :key="project.id">
            <td>{{ project.name }}</td>
            <td>
              <users-block
                :project="project"
                :allUsers="users"
                @updateListOfUsers="updateListOfUserIds(...arguments, project)" />
            </td>
            <td align="right">
              <project-form :project="project" @processData="updateProject(project.id, $event)">
                <v-btn
                  color="primary"
                  fab
                  x-small
                  dark>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </project-form>
              <v-btn
                color="error"
                fab
                x-small
                dark
                @click="markProjectAsPendingDelete(project.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </div>
    <h3 v-else>{{ $t('projects.no_projects') }}</h3>

    <v-dialog v-model="deleteDialog" max-width="450">
      <v-card>
        <v-card-title class="headline">{{ $t("are_you_sure") }}</v-card-title>
        <v-card-text>
          {{ $t("projects.approve_deleting") }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="deleteProject">
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
import ProjectForm from "@/components/admin/projects/form"
import UsersBlock from "@/components/admin/projects/users_block"

export default {

  components: {
    "project-form": ProjectForm,
    "users-block": UsersBlock
  },

  data() {
    return {
      projects: [],
      users: [],
      deleteDialog: false,
      deletingProjectId: null
    }
  },

  mounted(){
    this.fetchProjects();
    this.fetchUsers();
  },

  methods: {

    async fetchProjects(){
      const response = await this.$api.allProjects()
      if(response.data)
        this.projects = response.data
    },

    async  fetchUsers(){
      const response = await this.$api.allUsers()
      if(response.data)
        this.users = response.data
    },

    async createProject(data){
      const response = await this.$api.createProject(data)
      if(response.data)
        this.projects.push(response.data)
    },

    async updateProject(id, data){
      const response = await this.$api.updateProject(id, data)
      if(response.data){
        const projectIndex = this.projects.findIndex(p => p.id === id )
        this.$set(this.projects, projectIndex, response.data)
      }
    },

    markProjectAsPendingDelete(id){
      this.deletingProjectId = id
      this.deleteDialog = true
    },

    async deleteProject(){
      this.deleteDialog = false
      const response = await this.$api.deleteProject(this.deletingProjectId)
      if(response.data){
        const projectIndex = this.projects.findIndex(p => p.id === this.deletingProjectId)
        this.$delete(this.projects, projectIndex)
      }
    },

    updateListOfUserIds(action, user_id, project){
      if(action === "assign"){
        project.user_ids.push(user_id)
      } else {
        project.user_ids = project.user_ids.filter(id => id !== user_id)
      }
    }
  }
}
</script>

<style>
</style>
