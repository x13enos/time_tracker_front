const storeData = function () {
  return {
    state: {
      projects: [],
      counterOfPendingTasks: 0,
      user: {
        id: null,
        role: null,
        name: null,
        email: null,
        locale: null,
        activeWorkspaceId: null
      },
      snack: {
        message: '',
        color: ''
      },
      tasks: []
    },
    actions: {
      signIn: () => {},
      addTask: () => {},
      updateTask: () => {},
      deleteTask: () => {},
      getWeeklyTasks: () => {}
    },
    mutations: {
      updateUserData: () => {},
      updateProjects: () => {},
      updateTaskSpentTime: () => {},
      keepActiveTaskIntervalId: () => {},
      updateSnack: () => {},
      updateCounterOfPendingTasks: () => {},
      updatePersonalInfo: () => {},
      clearActiveTaskIntervalId: () => {},
      addPendingTaskId: () => {},
      deletePendingTaskId: () => {}
    },
    getters: {
      isAdmin: () => {},
      totalTimeOfDailyTasks: () => { return () => {} }
    }
  }
}

module.exports = storeData
