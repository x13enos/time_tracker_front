const store_data = {
  state: {
    projects: [],
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
    updateSnack: () => {}
  }
}

module.exports = store_data;
