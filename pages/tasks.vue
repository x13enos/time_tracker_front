<template>
  <div>
    <h1>
      Time Sheet
    </h1>

    <daysBar />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    daysBar: () => import('~/components/days/bar.vue')
  },

  data() {
    return {
      dialog: false,
    }
  },

  beforeRouteLeave(to, from, next) {
    this.checkOnPendingTasks(() => { next() })
  },

  mounted() {
    window.addEventListener('beforeunload', (event) => {
      if(this.somePendingTasks())
        event.returnValue = "Changes that you made may not be saved.";
    });
  },

  async fetch({ app }){
    let projects, tasks;

    const projectsResponse = await app.$api.allProjects()
    if(projectsResponse.data)
      projects = projectsResponse.data

    app.store.commit("updateProjects", projects)
  },

  methods: {
    ...mapGetters(["somePendingTasks"]),
    ...mapActions(["checkOnPendingTasks"])
  }
}
</script>
