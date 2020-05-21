export default function state(){
  return {
    activeTaskIntervalId: null,
    projects: [],
    tags: [],
    tasks: {},
    counterOfPendingTasks: 0,
    pendingTasks: [],
    snack: {
      message: "",
      color: ""
    },
    user: {
      id: "",
      name: null,
      email: null,
      role: "",
      activeWorkspaceId: "",
    }
  }
}
