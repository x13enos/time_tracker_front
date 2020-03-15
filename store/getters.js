export default {
  userAuthorized (state) {
    return state.user.name != null
  },

  somePendingTasks (state) {
    return state.pendingTasks.length > 0
  },

  isAdmin (state) {
    return state.user.role === 'admin'
  },

  totalTimeOfDailyTasks (state) {
    return (day) => {
      const tasks = state.tasks[day.startOf('day').ts / 1000]
      if(tasks && Object.values(tasks).length){
        const time = Object.values(tasks).reduce((accumulator, task) => accumulator + task.spentTime, 0)
        return parseFloat(time).toFixed(2);
      } else {
        return "0.0"
      }
    }
  }
}
