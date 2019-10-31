<template>
  <div>
    <h1>
      Time Sheet
    </h1>

    <daysBar />
  </div>
</template>

<script>
import daysBar from '~/components/days/bar.vue'

export default {
  components: { daysBar },

  async fetch({ app }){
    let projects, tasks;

    const projectsResponse = await app.$api.allProjects()
    if(projectsResponse.data)
      projects = projectsResponse.data

    app.store.commit("updateProjects", projects)
  }
}
</script>
