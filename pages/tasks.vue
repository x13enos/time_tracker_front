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
              @updateInfo="updateTaskData($event, task)"
            />
          </template>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import Item from '~/components/tasks/item.vue'

export default {
  components: { 'task': Item },

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
    updateTaskData(data, task){
      Object.assign(task, data)
    },

    async fetchProjects(){
      const { data } = await this.$api.allProjects()
      this.projects = data;
    },

    async fetchTasks(){
      const { data } = await this.$api.allTimeRecords()
      this.handleTasksData(data)
    },

    addEmptyTask(){
      this.tasks.push({
        id: null,
        project: null,
        description: null,
        time: 0.0,
        active: false
      })
    },

    async handleTasksData(data){
      await data.forEach((taskData) => {
        this.tasks.push({
          id: taskData.id,
          project: taskData.project.id,
          description: taskData.description,
          time: taskData.spentTime,
          active: !this.isEmpty(taskData.timeStart)
        })
      })
      this.addEmptyTask()
    },

    isEmpty(val){
      return (val === undefined || val == null || val.length <= 0) ? true : false;
    },
  }
}
</script>

<style>
</style>
