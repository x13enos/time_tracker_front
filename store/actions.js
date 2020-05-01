export default {
  async getUserInfo ({ commit }) {
    const response = await this.$api.personalInfo()
    commit('updatePersonalInfo', response.data)
  },

  async updateUserProfile({ commit }, data){
    const response = await this.$api.updateUserProfile(data)
    commit('updatePersonalInfo', response.data)
    return response;
  },

  async getWeeklyTasks ({ commit }, day) {
    commit('reinitTasksObject', day)
    commit('clearActiveTaskIntervalId')
    const response = await this.$api.weeklyTimeRecords(day)
    commit('updateTasks', response.data.time_records)
    return response;
  },

  async addTask ({ commit, dispatch }, { params, day }) {
    params.assignedDate = this.$appMethods.systemFormatDate(day)
    const response = await this.$api.createTimeRecord(params)
    dispatch("stopOtherTasks", response.data)
    commit('updateTask', response.data)
    return response;
  },

  async updateTask ({ commit, dispatch }, params) {
    const response = await this.$api.updateTimeRecord(params)
    dispatch("stopOtherTasks", response.data)
    commit('updateTask', response.data)
    return response;
  },

  async deleteTask ({ commit }, data) {
    const response = await this.$api.deleteTimeRecord(data)
    commit('deleteTask', data)
    return response;
  },

  stopOtherTasks ({ commit }, data) {
    if(!this.$appMethods.isEmpty(data.time_start)){
      commit("clearActiveTaskIntervalId")
      commit("cleanTasksStartTime")
    }
  },

  checkOnPendingTasks({ commit, getters }, callback){
    if(getters.somePendingTasks){
      if(confirm("Changes that you made may not be saved.")){
        commit("cleanCounterOfPendingTasks")
        callback()
      }
    } else {
      callback()
    }
  }
}
