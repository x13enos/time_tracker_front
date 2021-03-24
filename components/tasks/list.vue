<template>
  <div>
    <v-row class="d-none d-sm-flex subtitle-2 titles">
      <v-col cols="2">
        {{ $t("time_sheet.project") }}
      </v-col>
      <v-col cols="8">
        {{ $t("time_sheet.description") }}
      </v-col>
      <v-col cols="1" class='text-center'>
        {{ $t("time_sheet.time") }}
      </v-col>
      <!-- <v-col cols="1" class="text-right">
        {{ $t("time_sheet.total") }}: {{ totalTimeOfDailyTasks(selectedDate) }}
      </v-col> -->
    </v-row>
    <task
      v-for="(taskInfo, taskId, index) in dailyTasks" :key="taskId"
      :task="taskInfo"
      :activeDay="activeDay"
      :dayIsBlocked="dayIsBlocked(selectedDate)"
      @keepIntervalId="keepIntervalId($event, intervalId)"
      @clearIntervalId="clearIntervalId"
    />
  </div>
</template>

<script>
import UpdateItem from '~/components/tasks/update_item.vue'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  props: {
    selectedDate: {
      type: Object,
      required: true
    },

    currentDate: {
      type: Object,
      required: true
    }
  },

  components: {
    "task": UpdateItem
  },

  data: function() {
    return {
      intervalId: null
    }
  },

  computed: {
    ...mapState(["tasks"]),
    ...mapGetters(["totalTimeOfDailyTasks", "dayIsBlocked"]),

    dailyTasks(){
      const tasks = this.tasks[this.$appMethods.systemFormatDate(this.selectedDate)] || {}
      return Object.values(tasks).filter(t => !t.timeStart )
    },

    activeDay(){
      return this.currentDate.startOf('day').ts === this.selectedDate.startOf('day').ts
    }
  },

  methods: {
    keepIntervalId(intervalId){
      this.intervalId = intervalId
    },

    clearIntervalId(){
      clearInterval(this.intervalId)
    }
  }
}
</script>

<style scoped>
  .titles {
    color: #828282;
  }
</style>
