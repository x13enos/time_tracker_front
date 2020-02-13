export default {
  updatePersonalInfo (state, userData) {
    Object.assign(state.user, userData)
    this.$i18n.locale = state.user.locale
  },

  updateProjects(state, projects) {
    state.projects = projects
  },

  updateTasks(state, data) {
    state.tasks = data.map((taskData) => {
      return collectTaskData(taskData)
    })
  },

  addTask(state, data){
    state.tasks.push(collectTaskData(data))
  },

  updateTask(state, data){
    const taskData = collectTaskData(data)
    const task = state.tasks.find(task => task.id === taskData.id);
    Object.assign(task, taskData)
  },

  deleteTask(state, id){
    const index = state.tasks.findIndex(task => task.id === id);
    state.tasks.splice(index, 1)
  },

  updateTaskSpentTime(state, {spentTime, id}){
    const task = state.tasks.find(task => task.id === id);
    Object.assign(task, { spentTime })
  },

  keepActiveTaskIntervalId(state, intervalId){
    state.activeTaskIntervalId = intervalId
  },

  clearActiveTaskIntervalId(state){
    clearInterval(state.activeTaskIntervalId)
    state.activeTaskIntervalId = null
  },

  cleanTasksStartTime(state){
    state.tasks.forEach((task) => { task.timeStart = null })
  },

  clearTasks(state){
    state.tasks = []
  },

  updateSnack(state, data){
    state.snack = data
  },

  updateCounterOfPendingTasks(state, number){
    state.counterOfPendingTasks += number
  },

  cleanCounterOfPendingTasks(state){
    state.counterOfPendingTasks = 0
  }
}

function collectTaskData(taskData){
  return {
    id: taskData.id,
    project: taskData.project_id,
    description: taskData.description,
    spentTime: taskData.spent_time,
    timeStart: taskData.time_start
  }
}
