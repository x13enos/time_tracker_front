<template>
  <div>
    <h1>
      {{ $t("time_sheet.title") }}
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
        event.returnValue = this.$t("you_can_lose_changes");
    });
  },

  async fetch({ app }){

    const projectsResponse = await app.$api.allProjects()
    if(projectsResponse.data)
      app.store.commit("updateProjects", projectsResponse.data)

    const tagsResponse = await app.$api.allTags()
    if(tagsResponse.data)
      app.store.commit("updateTags", tagsResponse.data)
  },

  methods: {
    ...mapGetters(["somePendingTasks"]),
    ...mapActions(["checkOnPendingTasks"])
  }
}
</script>
