<template>
  <div class='date-panel d-flex'>
    <div @click="changeDay(-7)" class="default-btn btn-icon mr-1">
      <v-icon>mdi-chevron-left</v-icon>
    </div>

    <date-select />

    <div @click="changeDay(7)" class="default-btn btn-icon ml-1">
      <v-icon>mdi-chevron-right</v-icon>
    </div>

    <span v-if="weekDays.length" class="date-range ml-5">
      {{ currentWeek }}
      <span class="gray-color">(
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

    .total-time {
      color: black;
    }
  }
</style>
