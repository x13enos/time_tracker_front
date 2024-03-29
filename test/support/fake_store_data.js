const { DateTime } = require('luxon');

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
        activeWorkspaceId: null,
        notificationSettings: []
      },
      snack: {
        message: '',
        color: ''
      },
      tasks: [],
      unapprovedPeriods: [],
      currentDate: DateTime.local(),
      selectedDate: DateTime.local()
    },
    actions: {
      signIn: () => {},
      addTask: () => {},
      updateActiveTask: () => {},
      updateNonActiveTask: () => {},
      deleteTask: () => {},
      getWeeklyTasks: () => {},
      fetchActiveTimeRecord: () => {},
      updateSelectedDate: () => {}
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
      changeWorkspaceInfo: () => {},
      updateSelectedDate: () => {},
      updateCurrentDate: () => {}
    },
    getters: {
      isAdmin: () => {},
      isManager: () => {},
      isOwner: () => {},
      totalTimeOfDailyTasks: () => { return () => {} },
      totalTimeOfWeeklyTasks: () => {},
      dayIsBlocked: () => { return () => false },
      weekDays: () => [],
      activeDay: () => {}
    }
  }
}

module.exports = storeData
