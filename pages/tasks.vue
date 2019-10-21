<template>
  <div>
    <h1>
      Tasks
    </h1>
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
              :projects="projects"
              @updateTask="updateTask($event, task)"
            />
          </template>
          <new-task :projects="projects" @addTask="addTask($event)" />
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import createItem from '~/components/tasks/create_item.vue'
import updateItem from '~/components/tasks/update_item.vue'

export default {
  components: {
    "new-task": createItem,
    "task": updateItem
  },

  data: function(){
    return {
      projects: [],
      tasks: []
    }
  },

  mounted: async function() {
    await this.fetchProjects()
    this.fetchTasks()
  },

  methods: {
    async fetchProjects(){
      const { data } = await this.$api.allProjects()
      if(data)
        this.projects = data
    },

    async fetchTasks(){
      const { data } = await this.$api.allTimeRecords()
      if(data)
        this.handleTasksData(data)
    },

    async handleTasksData(data){
      this.tasks = data.map((taskData) => {
        return {
          id: taskData.id,
          project: taskData.project.id,
          description: taskData.description,
          spentTime: taskData.spentTime,
          timeStart: taskData.timeStart
        }
      })
    },

    async addTask(params){
      const { data } = await this.$api.createTimeRecord(params)
      params.id = data.timeRecord.id
      params.timeStart = data.timeRecord.timeStart
      this.tasks.push(params)
    },

    async updateTask(params, task){
      const data = await this.$api.updateTimeRecord(params)
      Object.assign(task, params)
    },


    isEmpty(val){
      return (val === undefined || val == null || val.length <= 0) ? true : false;
    },
  }
}
</script>

<style>
</style>
