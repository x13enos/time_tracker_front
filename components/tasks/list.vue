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
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(task, index) in tasks">
          <task
            :task="task"
            :activeDay="activeDay"
            @keepIntervalId="keepIntervalId($event, intervalId)"
            @clearIntervalId="clearIntervalId"
            @updateTask="updateTask($event, task, index)"
            @deleteTask="deleteTask(task, index)"
          />
        </template>
        <new-task :activeDay="activeDay" @addTask="addTask($event)" />
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import createItem from '~/components/tasks/create_item.vue'
import updateItem from '~/components/tasks/update_item.vue'

export default {
  props: {
    day: {
      type: Date,
      required: true
    },

    currentDate: {
      type: Date,
      required: true
    }
  },

  components: {
    "new-task": createItem,
    "task": updateItem
  },

  data: function() {
    return {
      tasks: [],
      intervalId: null
    }
  },

  mounted: async function(){
    const { data } = await this.$api.allTimeRecords(this.dateInUnixFormat())
    if(data){
      this.tasks = data.map((taskData) => {
        return {
          id: taskData.id,
          project: taskData.project.id,
          description: taskData.description,
          spentTime: taskData.spentTime,
          timeStart: taskData.timeStart
        }
      })
    }
  },

  computed: {
    activeDay(){
      return this.currentDate.setHours(0,0,0,0) === this.day.setHours(0,0,0,0)
    }
  },

  methods: {
    async addTask(params){
      params.assignedDate = this.dateInUnixFormat()
      const { data } = await this.$api.createTimeRecord(params)
      params.id = data.timeRecord.id
      params.timeStart = data.timeRecord.timeStart
      this.stopOtherTasks(data)
      this.tasks.push(params)
    },

    async updateTask(params, task, index){
      const { data } = await this.$api.updateTimeRecord(params)
      this.stopOtherTasks(data)
      this.$set(this.tasks, index, data.timeRecord)
    },

    async deleteTask(task, index){
      const { data } = await this.$api.deleteTimeRecord({ id: task.id })
      this.$delete(this.tasks, index)
    },

    dateInUnixFormat(){
      return this.day.getTime() / 1000
    },

    stopOtherTasks(data){
      if(!this.$appMethods.isEmpty(data.timeRecord.timeStart)){
        this.clearIntervalId()
        this.tasks.forEach((task) => { task.timeStart = null })
      }
    },

    keepIntervalId(intervalId){
      this.intervalId = intervalId
    },

    clearIntervalId(){
      clearInterval(this.intervalId)
    }
  }
}
</script>
