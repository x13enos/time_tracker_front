export default {
  updateUserData (state, userData) {
    state.user.name = userData.user.name
  },

  updateProjects(state, projects) {
    state.projects = projects
  }
}
