const store_data = {
  state: {
    projects: [],
    counterOfPendingTasks: 0,
    user: {
      name: ''
    },
    snack: {
      message: "",
      color: ""
    }
  },
  actions: {
    signIn: () => {},
    addTask: () => {},
    updateTask: () => {}
  },
  mutations: {
    updateUserData: () => {},
    updateProjects: () => {},
    updateTaskSpentTime: () => {},
    keepActiveTaskIntervalId: () => {},
    updateSnack: () => {},
    updateCounterOfPendingTasks: () => {}
  }
}

module.exports = store_data;
