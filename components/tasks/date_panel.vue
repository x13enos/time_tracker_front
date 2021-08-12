<template>
  <div class='date-panel mt-12 d-flex'>
    <div @click="changeDay(-7)" class="btn">
      <v-icon>mdi-chevron-left</v-icon>
    </div>

    <date-select />

    <div @click="changeDay(7)" class="btn">
      <v-icon>mdi-chevron-right</v-icon>
    </div>

    <span v-if="weekDays.length" class="date-range ml-2">
      {{ currentWeek }}
      <span class="total">(
        {{ $t("time_sheet.total") }}:
        <span class="total-time">{{ totalTimeOfWeeklyTasks }}{{ $t("time_sheet.hour_short") }}</span>
      )</span>
    </span>
  </div>
</template>

<script>
  import dateSelect from "@/components/tasks/date_select";
  import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';

  export default {
    components: {
      "date-select": dateSelect
    },

    computed: {
      ...mapState(['selectedDate']),
      ...mapGetters(["totalTimeOfWeeklyTasks", 'weekDays']),

      currentWeek(){
        return `${this.$d(this.weekDays[0], 'onlyDay')} - ${this.$d(this.weekDays[6], 'onlyDay')}
                ${this.$d(this.weekDays[6], 'monthLong')}, ${this.$d(this.weekDays[6], 'onlyYear')}`
      }
    },

    methods: {
      ...mapActions(["getWeeklyTasks"]),
      ...mapMutations(['updateSelectedDate']),

      async changeDay(number){
        await this.updateSelectedDate(this.selectedDate.plus({ days: number }))
        this.getWeeklyTasks(this.selectedDate);
      }

    }
  }
</script>

<style lang="scss">
  .date-panel {
    .date-range {
      text-transform: lowercase;
      font-size: 16px;
      font-weight: 500;
      margin-top: 0.6rem;
    }

    .btn {
      text-align: center;
      cursor: pointer;
      padding: 8px 0;
      width: 45px;
      background-color: white;
      border-radius: 5px;
      height: 40px;
      margin-right: 0.5rem;
    }

    .calendar-btn {
      padding: 8px 10px;
    }

    .btn > i {
      color: $font-green;
      width: 13px;
      font-size: 32px;
      height: 24px;
    }

    .calendar-btn > i {
      font-size: 24px;
    }

    .date-panel {
      padding: 0px 0.3rem;
    }

    .total {
      color: $gray-color;
    }

    .total-time {
      color: black;
    }
  }
</style>
