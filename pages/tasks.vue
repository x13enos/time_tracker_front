<template>
  <div>
    <div class='d-flex justify-space-between mb-2'>
      <h1>{{ $t("time_sheet.title") }}</h1>

      <TomatoTimer />
    </div>
    <daysBar />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TomatoTimer from '@/components/tasks/tomato_timer'

export default {
  head() {
    return {
      title: this.$t('page_titles.tasks')
    }
  },
  
  components: {
    daysBar: () => import('~/components/days/bar.vue'),
    TomatoTimer
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
