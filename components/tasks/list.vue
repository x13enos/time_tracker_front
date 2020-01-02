<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Project
          </th>
          <th class="text-left">
            Description
          </th>
          <th class="text-left">
            Time
            <span class="float-right">Total: {{ totalTime }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <task
          v-for="(task, index) in tasks" :key="task.id"
          :task="task"
          :activeDay="activeDay"
          @keepIntervalId="keepIntervalId($event, intervalId)"
          @clearIntervalId="clearIntervalId"
        />
        <new-task :activeDay="activeDay" :day="day" />
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import createItem from '~/components/tasks/create_item.vue'
import updateItem from '~/components/tasks/update_item.vue'
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
    "new-task": createItem,
    "task": updateItem
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
