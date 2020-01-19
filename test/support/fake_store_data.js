const store_data = function (){
  return {
    state: {
      projects: [],
      counterOfPendingTasks: 0,
      user: {
        name: null,
        email: null,
        timezone: null
      },
      snack: {
        message: "",
        color: ""
      }
    },
    actions: {
      signIn: () => {},
      addTask: () => {},
      updateTask: () => {},
      deleteTask: () => {}
    },
    mutations: {
      updateUserData: () => {},
      updateProjects: () => {},
      updateTaskSpentTime: () => {},
      keepActiveTaskIntervalId: () => {},
      updateSnack: () => {},
      updateCounterOfPendingTasks: () => {},
      updatePersonalInfo: () => {},
      clearActiveTaskIntervalId: () => {}
    },
    getters: {
      isAdmin: () => {}
    }
  }
}

module.exports = store_data;
