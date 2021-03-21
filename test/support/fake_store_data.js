const storeData = function () {
  return {
    state: {
      projects: [],
      tags: [],
      counterOfPendingTasks: 0,
      user: {
        id: null,
        role: null,
        name: null,
        email: null,
        locale: 'en',
        activeWorkspaceId: null
      },
      snack: {
        message: '',
        color: ''
      },
      tasks: [],
      unapprovedPeriods: []
    },
    actions: {
      signIn: () => {},
      addTask: () => {},
      updateTask: () => {},
      deleteTask: () => {},
      getWeeklyTasks: () => {},
      fetchActiveTimeRecord: () => {}
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
      deletePendingTaskId: () => {},
      addWorkspaceToUserInfo: () => {},
      changeWorkspaceInfo: () => {}
    },
    getters: {
      isAdmin: () => {},
      isManager: () => {},
      isOwner: () => {},
      totalTimeOfDailyTasks: () => { return () => {} },
      totalTimeOfWeeklyTasks: () => {},
      dayIsBlocked: () => { return () => false }
    }
  }
}

module.exports = storeData
