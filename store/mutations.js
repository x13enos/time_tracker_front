export default {
  updateUserData (state, userData) {
    // localStorage.setItem('authToken', userData.token)
    state.user.name = userData.user.name
    this.$router.replace({ path: '/' })
  }
}
