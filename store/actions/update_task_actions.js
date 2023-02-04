export default {
  async updateActiveTask ({ commit, dispatch }, params) {
    const response = await this.$api.updateTimeRecord(params)
    if (params.active === false)
      await dispatch('handleStoppingTask', response.data)
    if (params.active === true)
      commit('updateCurrentTask', response.data)
    commit('updateTask', response.data)
    return response;
  },

  async updateNonActiveTask ({ commit, dispatch }, params) {
    const response = await this.$api.updateTimeRecord(params)
    if (params.active === true) {
      await dispatch('stopOtherTasks')
      commit('updateCurrentTask', response.data)
    }
    commit('updateTask', response.data)
    return response;
  },

  async handleStoppingTask({ commit, dispatch }, taskData) {
    const parsedDate = taskData.assigned_date.split('/');
    await dispatch('updateSelectedDate', parsedDate);
    commit('updateCurrentTask', null);
  }
}
