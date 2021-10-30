<template>
  <div>
    <!-- <div class="d-flex justify-space-between mb-2">
      <h1>{{ $t("time_sheet.title") }}</h1>

      <TomatoTimer />
    </div> -->
    <CurrentTask />
    <DatePanel />
    <DaysBar/>
    <div class="main-content-container">
      <TasksList/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'
import { DateTime } from 'luxon'
import TomatoTimer from '@/components/tasks/tomato_timer'

export default {
  head () {
    return {
      title: this.$t('page_titles.tasks')
    }
  },

  components: {
    DatePanel: () => import('~/components/tasks/date_panel.vue'),
    DaysBar: () => import('~/components/tasks/days_bar.vue'),
    CurrentTask: () => import('~/components/tasks/current.vue'),
    TasksList: () => import('~/components/tasks/list.vue'),
    TomatoTimer
  },

  data () {
    return {
      dialog: false,
      intervalId: null
    }
  },

  beforeRouteLeave (to, from, next) {
    this.checkOnPendingTasks(() => { next() })
  },

  computed: {
    ...mapState(['selectedDate', 'currentDate'])
  },

  watch:{
      $route () {
        this.updateSelectedDate(this.currentDate);
      }
  },

  async fetch ({ app }) {
    const projectsResponse = await app.$api.allProjects()
    if (projectsResponse.data) { app.store.commit('updateProjects', projectsResponse.data) }

    const tagsResponse = await app.$api.allTags()
    if (tagsResponse.data) { app.store.commit('updateTags', tagsResponse.data) }
  },

  async mounted () {
    if (this.$route.query.date)
      await this.updateSelectedDate(this.$route.query.date.split('-').reverse());

    await this.getWeeklyTasks(this.selectedDate);
    await this.fetchActiveTimeRecord();

    window.addEventListener('beforeunload', (event) => {
      if (this.somePendingTasks()) { event.returnValue = this.$t('you_can_lose_changes') }
    })
  },

  created: function () {
    this.intervalId = setInterval(() => {
      this.updateCurrentDate(DateTime.local())
    }, 60000)
  },

  destroyed: function(){
    clearInterval(this.intervalId)
  },

  methods: {
    ...mapMutations['updateCurrentDate'],
    ...mapGetters(['somePendingTasks']),
    ...mapActions(['checkOnPendingTasks', 'getWeeklyTasks', 'fetchActiveTimeRecord', 'updateSelectedDate'])
  }
}
</script>
