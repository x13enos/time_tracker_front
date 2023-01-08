<template>
  <Select 
    :items="projectsOptions"
    v-model="project"
    :title="$t('projects.project')"
    :addLink="$t('projects.add')">
    {{  project ? projectName : $t("projects.select") }}
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
