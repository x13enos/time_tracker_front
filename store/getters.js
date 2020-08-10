import $appMethods from "@/services/global_methods";

export default {
  userAuthorized (state) {
    return state.user.name != null
  },

  somePendingTasks (state) {
    return state.pendingTasks.length > 0
  },

  isManager (state) {
    return state.user.role === 'admin'
  },

  isOwner (state) {
    return state.user.role === 'owner'
  },

  isManager (state) {
    return ['owner', 'admin'].includes(state.user.role)
  },

  totalTimeOfWeeklyTasks(state) {
    const tasks = []
    Object.values(state.tasks).forEach((dailyTasks, _day) => {
      tasks.push(...Object.values(dailyTasks))
    })
    const time = tasks.reduce((accumulator, task) => accumulator + task.spentTime, 0)
    return parseFloat(time.toFixed(2));
  },

  dayIsBlocked(state) {
    return function(day) {
      if(this.$config.extensionEnabled){
        return state.blockedDays.includes($appMethods.systemFormatDate(day))
      } else {
        return false
      }
    }
  },

  totalTimeOfDailyTasks(state) {
    return function (day) {
      const tasks = state.tasks[$appMethods.systemFormatDate(day)]
      if(!!tasks){
        const time = Object.values(tasks).reduce((accumulator, task) => accumulator + task.spentTime, 0)
        return parseFloat(time.toFixed(2));
      } else {
        return 0.0
      }
    }
  }
}
