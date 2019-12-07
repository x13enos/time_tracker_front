const store_data = {
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
    updateTask: () => {}
  },
  mutations: {
    updateUserData: () => {},
    updateProjects: () => {},
    updateTaskSpentTime: () => {},
    keepActiveTaskIntervalId: () => {},
    updateSnack: () => {},
    updateCounterOfPendingTasks: () => {},
    updatePersonalInfo: () => {}
  },
  getters: {
    isAdmin: () => {}
  }
}

module.exports = store_data;
