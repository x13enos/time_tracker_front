<template>
  <div>
    <v-divider />

      <v-row align="center" justify="start">
        <v-col cols="2">
          <v-btn @click="changeDay(-7)" class="previous-week" :min-width="0" outlined color="blue lighten-3">
            <v-icon>mdi-chevron-left</v-icon>
            <span class="d-none d-sm-flex">Previous week</span>
          </v-btn>
        </v-col>

        <v-col cols="8" class="text-center">
          <span v-if="days.length" class="title">{{ currentWeek }}</span>
        </v-col>

        <v-col cols="2" class="text-right">
          <v-btn @click="changeDay(7)" class="next-week" :min-width="0"  outlined color="blue lighten-3">
            <span class="d-none d-sm-flex">Next week</span>
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    <v-divider />

    <v-tabs v-model="tab" background-color="transparent" @change="getDailyTasks(selectedDate)" grow>
      <v-tab
        v-for="day in days"
        :key="getFormattedDateForTab(day)"
        @click="selectedDate = day">
        {{ getFormattedDateForTab(day) }}
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
  import { mapActions } from 'vuex'

  export default {
    components: { tasksList },

    data: function() {
      return {
        selectedDate: new Date(),
        currentDate: new Date(),
        tab: null,
        intervalId: null
      }
    },

    mounted: function(){
      this.setTheRightTab()
    },

    created: function () {
      this.intervalId = setInterval(() => { this.currentDate = new Date() }, 5000)
    },

    destroyed: function(){
      clearInterval(this.intervalId)
    },

    computed: {
      days(){
        return this.weekDays(this.selectedDate)
      },

      currentWeek(){
        return `${this.getFormattedDateForWeek(this.days[0])} - ${this.getFormattedDateForWeek(this.days[6])}`
      }
    },

    methods: {
      ...mapActions(["getDailyTasks"]),

      weekDays(passedDate) {
        const date = new Date(passedDate);
        const week = new Array();
        date.setDate((date.getDate() - date.getDay() + (date.getDay() == 0 ? -6 : 1 ) ));
        for (var i = 0; i < 7; i++) {
            week.push(new Date(date));
            date.setDate(date.getDate() +1);
        }
        return week;
      },

      getFormattedDateForTab(date) {
        const year = date.getFullYear();
        const month = (1 + date.getMonth()).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        return month + '/' + day + '/' + year;
      },

      getFormattedDateForWeek(date) {
        const monthNames = [
          "January", "February", "March", "April", "May", "June", "July",
          "August", "September", "October", "November", "December"
        ]

        const month = date.getMonth()
        const day = date.getDate().toString()

        return `${day} ${monthNames[month]}`
      },

      setTheRightTab() {
        const date = this.selectedDate
        this.tab = date.getDay() == 0 ? 6 : date.getDay() - 1
      },

      async changeDay(number){
        this.tab = null
        const newDate = this.selectedDate.getDate() + number
        this.selectedDate = new Date(this.selectedDate.setDate(newDate))
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
</style>
