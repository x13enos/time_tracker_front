<template>
  <div class='date-panel mt-12 d-flex'>
    <div @click="changeDay(-7)" class="btn">
      <v-icon>mdi-chevron-left</v-icon>
    </div>

    <div class="btn calendar-btn">
      <v-icon >mdi-calendar-month</v-icon>
    </div>

    <div @click="changeDay(7)" class="btn">
      <v-icon>mdi-chevron-right</v-icon>
    </div>

    <span v-if="days.length" class="date-range ml-2">
      {{ currentWeek }}
      <span class="total">(
        {{ $t("time_sheet.total") }}:
        <span class="total-time">{{ totalTimeOfWeeklyTasks }}{{ $t("time_sheet.hour_short") }}</span>
      )</span>
    </span>
  </div>
</template>

<script>
  import { mapActions, mapState, mapGetters } from 'vuex'

  export default {
    props: {
      selectedDate: {
        type: Object,
        required: true
      },

      days: {
        type: Array,
        required: true
      }
    },

    computed: {
      ...mapGetters(["totalTimeOfWeeklyTasks"]),

      currentWeek(){
        return `${this.$d(this.days[0], 'onlyDay')} - ${this.$d(this.days[6], 'onlyDay')}
                ${this.$d(this.days[6], 'monthLong')}, ${this.$d(this.days[6], 'onlyYear')}`
      }
    },

    methods: {
      ...mapActions(["getWeeklyTasks"]),

      async changeDay(number){
        await this.$emit('update:selected-date', this.selectedDate.plus({ days: number }))
        this.getWeeklyTasks(this.selectedDate);
      }

    }
  }
</script>

<style lang="scss" scoped>
  .date-range {
    text-transform: lowercase;
    font-size: 16px;
    font-weight: 500;
    line-height: 2.5rem;
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
</style>
