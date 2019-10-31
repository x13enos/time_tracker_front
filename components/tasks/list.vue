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
            @updateTask="updateTask($event, task)"
          />
        </template>
        <new-task @addTask="addTask($event)" />
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
    }
  },

  components: {
    "new-task": createItem,
    "task": updateItem
  },

  data: function() {
    return {
      tasks: []
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

  methods: {
    async addTask(params){
      params.assignedDate = this.dateInUnixFormat()
      const { data } = await this.$api.createTimeRecord(params)
      params.id = data.timeRecord.id
      params.timeStart = data.timeRecord.timeStart
      this.tasks.push(params)
    },

    async updateTask(params, task){
      await this.$api.updateTimeRecord(params)
      Object.assign(task, params)
    },

    dateInUnixFormat(){
      return this.day.getTime() / 1000
    }
  }
}
</script>
