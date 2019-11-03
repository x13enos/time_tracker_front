<template>
  <div>
    <v-tabs v-model="tab" background-color="transparent" grow>
      <v-tab v-for="(day, index) in days" :key="index">
        {{ getFormattedDate(day) }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="(day, index) in days"
        :key="(day, index)"
        :transition="false"
        :reverse-transition="false" >
        <tasksList :day="day" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
  import tasksList from '@/components/tasks/list'

  export default {
    components: { tasksList },

    data: function() {
      return {
        days: [],
        currentDate: new Date(),
        tab: null
      }
    },

    mounted: function(){
      this.days = this.weekDays(this.currentDate)
      this.setTheRightTab(this.currentDate)
    },

    methods: {
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

      getFormattedDate(date) {
        const year = date.getFullYear();
        const month = (1 + date.getMonth()).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        return month + '/' + day + '/' + year;
      },

      setTheRightTab(date) {
        this.tab = date.getDay() == 0 ? 6 : date.getDay() - 1
      }
    }
  }
</script>
