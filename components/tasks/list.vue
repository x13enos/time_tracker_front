<template>
  <fragment>
    <v-row class="caption font-weight-black">
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
        {{ $t("time_sheet.total") }}: {{ totalTime }}
      </v-col>
    </v-row>
    <v-divider />
    <task
      v-for="(task, index) in tasks" :key="task.id"
      :task="task"
      :activeDay="activeDay"
      @keepIntervalId="keepIntervalId($event, intervalId)"
      @clearIntervalId="clearIntervalId"
    />
    <new-task :activeDay="activeDay" :day="day" />
  </fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'
import CreateItem from '~/components/tasks/create_item.vue'
import UpdateItem from '~/components/tasks/update_item.vue'
import { mapActions, mapState } from 'vuex'

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
    "fragment": Fragment,
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

    activeDay(){
      return this.currentDate.startOf('day').ts === this.day.startOf('day').ts
    },

    totalTime(){
      return this.tasks.map((task) => {
        return task.spentTime
      }).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
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
