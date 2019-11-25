export default {
  async getDailyTasks ({ commit }, day) {
    commit('clearTasks')
    commit('clearActiveTaskIntervalId')
    const response = await this.$api.allTimeRecords(dateInUnixFormat(day))
    if (response.success()) {
      commit('updateTasks', response.data)
    }
    return response;
  },

  async addTask ({ commit, dispatch }, { params, day }) {
    params.assignedDate = dateInUnixFormat(day)
    const response = await this.$api.createTimeRecord(params)
    if (response.success()) {
      dispatch("stopOtherTasks", response.data)
      commit('addTask', response.data)
    }
    return response;
  },

  async updateTask ({ commit, dispatch }, params) {
    const response = await this.$api.updateTimeRecord(params)
    if (response.success()) {
      dispatch("stopOtherTasks", response.data)
      commit('updateTask', response.data)
    }
    return response;
  },

  async deleteTask ({ commit }, data) {
    const response = await this.$api.deleteTimeRecord(data)
    if (response.success()) {
      commit('deleteTask', data.id)
    }
    return response;
  },

  stopOtherTasks ({ commit }, data) {
    if(!this.$appMethods.isEmpty(data.timeRecord.timeStart)){
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
  return day.getTime() / 1000
}
