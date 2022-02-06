<template>
  <Select 
    :items="projectsOptions"
    v-model="project"
    title="Project"
    addLink="Add Project">
    {{  project ? projectName : 'Select Project' }}
  </Select>
</template>

<script>
import { mapState } from 'vuex'

export default {

  props: {
    value: {
      type: Number,
      required: false,
      default: undefined
    }
  },

  data: function() {
    return {
      project: this.value,
    }
  },

  components: {
    Select: () => import('~/components/shared/select.vue')
  },

  computed: {
    ...mapState(['projects']),

    projectName () {
      const project = this.projects.find(p => p.id === this.project)
      return project ? project.name : null
    },

    projectsOptions() {
      return this.projects.map(project => { 
        return { name: project.name, value: project.id } 
      })
    }
  },

  watch: {
    project: function(value){
      this.$emit('update', value)
    }
  }
}
</script>
