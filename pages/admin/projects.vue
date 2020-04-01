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
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </v-simple-table>
    </div>
    <h3 v-else>{{ $t('projects.no_projects') }}</h3>

  </div>
</template>

<script>
import ProjectForm from "@/components/admin/projects/form"

export default {

  components: {
    "project-form": ProjectForm
  },

  data() {
    return {
      projects: [],
      users: []
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
    }

  }
}
</script>

<style>
</style>
