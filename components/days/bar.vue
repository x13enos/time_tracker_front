<template>
  <div>
    <v-divider />

    <v-row align="center" justify="start">
      <v-col cols="3">
        <v-btn @click="checkOnPendingTasks(() => { changeDay(-7) })" class="previous-week" :min-width="0" outlined color="blue lighten-1">
          <v-icon>mdi-chevron-left</v-icon>
          <span class="d-none d-sm-flex">
            {{ $t("time_sheet.previous_week") }}
          </span>
        </v-btn>
      </v-col>

      <v-col cols="6" class="text-center">
        <span v-if="days.length" class="title">{{ currentWeek }}</span>
      </v-col>

      <v-col cols="3" class="text-right">
        <v-btn @click="checkOnPendingTasks(() => { changeDay(7) })" class="next-week" :min-width="0"  outlined color="blue lighten-1">
          <span class="d-none d-sm-flex">
            {{ $t("time_sheet.next_week") }}
          </span>
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-divider />

    <v-tabs v-model="tab" background-color="transparent" grow>
      <v-tab
        class="d-flex justify-space-between"
        :class="{ 'amber lighten-3': isCurrentDay(day) }"
        v-for="day in days"
        :key="getFormattedDateForTab(day)"
        @click="selectedDate = day">
        <div>{{ getFormattedDateForTab(day) }}</div>
        <div>{{ totalTimeOfDailyTasks(day) }}</div>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" @change="setTheRightTab">
      <v-tab-item
        v-for="day in days"
        :key="getFormattedDateForTab(day)"
        :transition="false"
        :reverse-transition="false"
        >
        <tasksList :day="day" :currentDate="currentDate" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
  import tasksList from '@/components/tasks/list'
  import { mapActions, mapState, mapGetters } from 'vuex'
  import { DateTime } from 'luxon'

  export default {
    components: { tasksList },

    data: function() {
      return {
        selectedDate: DateTime.local(),
        currentDate: DateTime.local(),
        tab: null,
        intervalId: null
      }
    },

    mounted: async function(){
      await this.getWeeklyTasks(this.selectedDate);
      this.setTheRightTab()
    },

    created: function () {
      this.intervalId = setInterval(() => {
        this.currentDate = DateTime.local()
      }, 5000)
    },

    destroyed: function(){
      clearInterval(this.intervalId)
    },

    computed: {
      ...mapGetters(["totalTimeOfDailyTasks"]),

      days(){
        return this.weekDays(this.selectedDate)
      },

      currentWeek(){
        return `${this.getFormattedDateForWeek(this.days[0])} - ${this.getFormattedDateForWeek(this.days[6])}`
      }
    },

    methods: {
      ...mapActions([
        "getWeeklyTasks",
        "checkOnPendingTasks"
      ]),
      ...mapState(["user"]),

      weekDays(passedDate) {
        let date = passedDate.startOf('week')
        return [...Array(7).keys()].map((day) => {
          return date.plus({ days: day })
        })
      },

      isCurrentDay(day){
        return this.getFormattedDateForTab(day) === this.getFormattedDateForTab(this.currentDate)
      },

      getFormattedDateForTab(date) {
        return this.$d(date, 'short')
      },

      getFormattedDateForWeek(date) {
        return this.$d(date, 'long')
      },

      setTheRightTab() {
        this.tab = this.selectedDate.weekday - 1
      },

      async changeDay(number){
        this.tab = null
        this.selectedDate = this.selectedDate.plus({ days: number })
        await this.getWeeklyTasks(this.selectedDate);
      }

    }
  }
</script>

<style scoped>
  .previous-week{
    padding: 0 16px 0 8px;
  }

  .next-week{
    padding: 0 8px 0 16px;
  }

  .v-tab {
    justify-content: left;
    border: 1px solid #90CAF9
  }
</style>
