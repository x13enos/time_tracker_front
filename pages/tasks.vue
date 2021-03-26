<template>
  <div>
    <!-- <div class="d-flex justify-space-between mb-2">
      <h1>{{ $t("time_sheet.title") }}</h1>

      <TomatoTimer />
    </div> -->
    <CurrentTask
      :day="selectedDate"
    />
    <DaysBar :selectedDate="selectedDate" :currentDate="currentDate" v-bind:selected-date.sync="selectedDate" />
    <div class="main-content-container">
      <TasksList :selectedDate="selectedDate" :currentDate="currentDate" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { DateTime } from 'luxon'
import TomatoTimer from '@/components/tasks/tomato_timer'

export default {
  head () {
    return {
      title: this.$t('page_titles.tasks')
    }
  },

  components: {
    DaysBar: () => import('~/components/tasks/days_bar.vue'),
    CurrentTask: () => import('~/components/tasks/current.vue'),
    TasksList: () => import('~/components/tasks/list.vue'),
    TomatoTimer
  },

  data () {
    return {
      dialog: false,
      selectedDate: DateTime.local(),
      currentDate: DateTime.local(),
      intervalId: null
    }
  },

  beforeRouteLeave (to, from, next) {
    this.checkOnPendingTasks(() => { next() })
  },

  async fetch ({ app }) {
    const projectsResponse = await app.$api.allProjects()
    if (projectsResponse.data) { app.store.commit('updateProjects', projectsResponse.data) }

    const tagsResponse = await app.$api.allTags()
    if (tagsResponse.data) { app.store.commit('updateTags', tagsResponse.data) }
  },

  async mounted () {
    await this.getWeeklyTasks(this.selectedDate);
    await this.fetchActiveTimeRecord();

    window.addEventListener('beforeunload', (event) => {
      if (this.somePendingTasks()) { event.returnValue = this.$t('you_can_lose_changes') }
    })
  },

  created: function () {
    this.intervalId = setInterval(() => {
      this.currentDate = DateTime.local()
    }, 60000)
  },

  destroyed: function(){
    clearInterval(this.intervalId)
  },

  methods: {
    ...mapGetters(['somePendingTasks']),
    ...mapActions(['checkOnPendingTasks', 'getWeeklyTasks', 'fetchActiveTimeRecord'])
  }
}
</script>
