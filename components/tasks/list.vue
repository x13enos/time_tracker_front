<template>
  <div>
    <v-row class="caption font-weight-black d-none d-sm-flex">
      <v-col cols="2">
        {{ $t("time_sheet.project") }}
      </v-col>
      <v-col cols="8">
        {{ $t("time_sheet.description") }}
      </v-col>
      <v-col cols="1">
        {{ $t("time_sheet.time") }}
      </v-col>
      <v-col cols="1" class="text-right">
        {{ $t("time_sheet.total") }}: {{ totalTimeOfDailyTasks(day) }}
      </v-col>
    </v-row>
    <v-divider />
    <task
      v-for="(taskInfo, taskId, index) in dailyTasks" :key="taskId"
      :task="taskInfo"
      :activeDay="activeDay"
      @keepIntervalId="keepIntervalId($event, intervalId)"
      @clearIntervalId="clearIntervalId"
    />
    <new-task
      :activeDay="activeDay"
      :day="day"
    />
  </div>
</template>

<script>
import CreateItem from '~/components/tasks/create_item.vue'
import UpdateItem from '~/components/tasks/update_item.vue'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  props: {
    day: {
      type: Object,
      required: true
    },

    currentDate: {
      type: Object,
      required: true
    }
  },

  components: {
    "new-task": CreateItem,
    "task": UpdateItem
  },

  data: function() {
    return {
      intervalId: null
    }
  },

  computed: {
    ...mapState(["tasks"]),
    ...mapGetters(["totalTimeOfDailyTasks"]),

    dailyTasks(){
      return this.tasks[this.$appMethods.systemFormatDate(this.day)] || []
    },

    activeDay(){
      return this.currentDate.startOf('day').ts === this.day.startOf('day').ts
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
