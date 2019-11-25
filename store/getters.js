export default {
  userAuthorized (state) {
    return state.user.name != null
  },

  somePendingTasks (state) {
    return state.counterOfPendingTasks > 0
  }
}
