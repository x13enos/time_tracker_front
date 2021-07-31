<template>
  <div>
    <v-divider />

    <!-- <v-row align="center" justify="start">
      <v-col cols="4">
        <v-btn @click="checkOnPendingTasks(() => { changeDay(-7) })" class="previous-week" :min-width="0" outlined color="blue lighten-1">
          <v-icon>mdi-chevron-left</v-icon>
          <span class="d-none d-md-flex">
            {{ $t("time_sheet.previous_week") }}
          </span>
        </v-btn>
      </v-col>

      <v-col cols="4" class="text-center">
        <span v-if="days.length" class="title">{{ currentWeek }}</span>
      </v-col>

      <v-col cols="4" class="text-right">
        <v-btn @click="checkOnPendingTasks(() => { changeDay(7) })" class="next-week" :min-width="0"  outlined color="blue lighten-1">
          <span class="d-none d-md-flex">
            {{ $t("time_sheet.next_week") }}
          </span>
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row> -->

    <v-divider />

    <ul class="nav nav-tabs timesheet">
      <li
        :class="{ 'blue-grey lighten-3': dayIsBlocked(day) }"
        v-for="day in days"
        :key="getFormattedDateForTab(day)">
        <a
          :class="{
            'amber--text': isCurrentDay(day),
            'primary--text elevation-3 active-tab': isSelectedDate(day)
          }"
          @click="selectedDate = day"
          v-ripple="{ class: `primary--text` }">
          <div class="tabHour">{{ totalTimeOfDailyTasks(day) }}</div>
          <div class="dateDay">
            {{ getFormattedDateForTab(day) }}
            <v-icon v-if="dayIsBlocked(day)" class="lock-icon">mdi-lock</v-icon>
          </div>
          <div class="weekDayName">{{ getFormattedWeekDateForTab(day) }}</div>
        </a>
      </li>
    </ul>
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
      }, 60000)
    },

    destroyed: function(){
      clearInterval(this.intervalId)
    },

    computed: {
      ...mapGetters(["totalTimeOfDailyTasks", "totalTimeOfWeeklyTasks", "dayIsBlocked"]),

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

      isSelectedDate(day){
        return this.getFormattedDateForTab(day) === this.getFormattedDateForTab(this.selectedDate)
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

      getFormattedWeekDateForTab(date) {
        return this.$d(date, 'onlyWeekday')
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

  ul.nav.nav-tabs.timesheet {
    display: flex;
    width: 100%;
    padding: 5px 0 10px 0px;
    list-style: none;
    justify-content: space-between;
    align-items: center;
  }

  ul > li {
    margin-right: 2px;
  }

  ul > li > a {
    display: inline-block;
    padding: 10px;
    border: 1px solid #e9ecef;
    transition: all ease 0.2s;
    border-radius: 3px;
    width: 100%;
    min-height: 61px;
    text-decoration: none;
    color: #2d2c2c;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  }

  .active-tab {
    border-bottom: 2px solid #1976d2;
    transition: border-bottom 0.25s linear;
  }

  .tabHour {
    float: right;
    font-size: 10px;
    line-height: 12px;
    text-align: right;
  }

  .dateDay {
    font-weight: bold;
    font-size: 10px;
    line-height: 12px;
    letter-spacing: -1px;
  }

  .weekDayName {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 13px;
  }

  .total-time {
    text-align: right;
    font-size: 13px;
  }

  .fade-enter-active {
    transition: opacity 1.25s;
  }

  .fade-leave-active {
    display: none;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .lock-icon {
    font-size: 12px;
  }

  @media screen and (min-width: 800px) {
    ul > li {
      float: none;
      display: inline-block;
      width: 13%;
    }
  }

  @media screen and (max-width: 991px) {
    ul > li {
      margin-bottom: 10px;
      float: none;
      display: inline-block;
      width: 32% !important;
    }

    ul {
      display: flex !important;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }

  @media screen and (max-width: 767px) {
    ul > li {
      margin-right: 0px !important;
      margin-bottom: 10px;
      width: 49% !important;
    }
  }

</style>
