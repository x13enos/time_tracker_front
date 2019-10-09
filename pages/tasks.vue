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
    const response = await this.$api.allProjects()
    this.projects = response.data;
    this.tasks.push({
      id: null,
      project: null,
      description: null,
      time: 0.0,
      active: false
    })
  },

  methods: {
    updateTaskData(data, task){
      Object.assign(task, data)
    }
  }
}
</script>

<style>
</style>
