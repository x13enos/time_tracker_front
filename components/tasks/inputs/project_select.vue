<template>
  <v-menu>
    <template v-slot:activator="{ on }">
      <template v-on="on">
        <span :class="{ 'gray-color': !projectName }" v-on="on">
          {{ projectName || 'Select Project' }}
        </span>
      </template>
    </template>
    <v-card>
      <v-list>
        <v-list-item-group>
          <v-list-item v-for="project in projects" :key="project.id">
            <v-list-item-content @click="selectProject(project.id)">
              <v-list-item-title>
                {{ project.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-menu>
</template>
<script>
import { mapState } from 'vuex'

export default {

  props: {
    project: {
      type: Number,
      required: false,
      default: undefined
    }
  },

  computed: {
    ...mapState(['projects']),

    projectName () {
      if (this.project) {
        return this.projects.find(p => p.id === this.project).name
      }
    }
  },

  methods: {
    selectProject (projectId) {
      this.$emit('update', projectId)
    }
  }
}
</script>
