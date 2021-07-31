<template>
  <ul class="nav nav-tabs timesheet mt-4">
    <li
      :class="{ 'blue-grey lighten-3': dayIsBlocked(day) }"
      v-for="day in weekDays"
      :key="getFormattedDateForTab(day)">
      <a
        :class="{
          'current-day': isCurrentDay(day) && !isSelectedDate(day),
          'object-green active-tab': isSelectedDate(day)
        }"
        @click="updateSelectedDate(day)">
        <div class="d-flex justify-space-between">
          <div class="gray-color subtitle-2">
            {{ $d(day, 'onlyDay') }}
            {{ $d(day, 'onlyMonth') }}
            <v-icon v-if="dayIsBlocked(day)" class="lock-icon">mdi-lock</v-icon>
          </div>
          <div class="subtitle-2">{{ totalTimeOfDailyTasks(day) }}</div>
        </div>
        <div class="weekDayName subtitle-2 mt-1">{{ getFormattedWeekDateForTab(day) }}</div>
      </a>
    </li>
  </ul>
</template>

<script>
  import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'

  export default {

    mounted: async function(){
      await this.getWeeklyTasks(this.selectedDate);
    },

    computed: {
      ...mapState(["selectedDate", 'currentDate']),
      ...mapGetters(["dayIsBlocked", "totalTimeOfDailyTasks", 'weekDays']),

      currentWeek(){
        return `${this.getFormattedDateForWeek(this.weekDays[0])} - ${this.getFormattedDateForWeek(this.weekDays[6])}`
      }
    },

    methods: {
      ...mapActions([
        "getWeeklyTasks",
        "checkOnPendingTasks"
      ]),
      ...mapMutations(['updateSelectedDate']),

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

    }
  }
</script>

<style lang="scss" scoped>
  ul.nav.nav-tabs.timesheet {
    display: flex;
    width: 100%;
    padding: 0px 0.3rem;
    list-style: none;
    justify-content: space-between;
    align-items: center;
  }

  ul > li {
    margin-right: 5px;
    background-color: white;
    border-radius: 5px;
  }

  ul > li:last-child {
    margin-right: 0px;
  }

  a {
    display: inline-block;
    padding: 15px 10px;
    transition: all ease 0.2s;
    border-radius: 5px;
    width: 100%;
    min-height: 70px;
    text-decoration: none;
    color: #2d2c2c;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  }

  .active-tab div {
    color: white;
  }

  .current-day div {
    color: $font-green;
  }

  .weekDayName {
    text-transform: uppercase;
  }

  .total-time {
    text-align: right;
    font-size: 13px;
  }

  .lock-icon {
    font-size: 12px;
  }

  .subtitle-2 {
    line-height: 1.15rem;
  }

  @media screen and (min-width: 800px) {
    ul > li {
      float: none;
      display: inline-block;
      width: 15%;
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
