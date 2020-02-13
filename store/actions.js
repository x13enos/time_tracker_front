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

  async getDailyTasks ({ commit }, day) {
    commit('clearTasks')
    commit('clearActiveTaskIntervalId')
    const response = await this.$api.dailyTimeRecords(dateInUnixFormat(day))
    commit('updateTasks', response.data.time_records)
    return response;
  },

  async addTask ({ commit, dispatch }, { params, day }) {
    params.assignedDate = dateInUnixFormat(day)
    const response = await this.$api.createTimeRecord(params)
    dispatch("stopOtherTasks", response.data)
    commit('addTask', response.data)
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
    commit('deleteTask', data.id)
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

function dateInUnixFormat(day){
  return day.ts / 1000
}
