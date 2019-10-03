export default {
  async signIn ({ commit }, data) {
    const response = await this.$api.signIn(data);
    if (response.success()) {
      commit('updateUserData', response.data)
    }
    return response;
  }
}
