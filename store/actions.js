import BlockedDaysSearcher from "@/services/blocked_days_searcher";

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
    commit('updateTasks', response.data)
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
  },

  async approveTimeReport({ commit, state }, periodId) {
    if(this.app.$config.extensionEnabled){
      const period = state.unapprovedPeriods.find(p => p.id === periodId);
      const currentDates = Object.keys(state.tasks)
      const blockedDays = new BlockedDaysSearcher(period, currentDates).perform();
      if(blockedDays.length > 0) {
        commit('updateBlockedDays', blockedDays);
      }
    }
    await this.$api.approveTimeReport(periodId, {})
    commit("removeUnapprovedTimePeriod", periodId)
  },

  async changeWorkspace(app, id) {
    await this.$api.changeActiveWorkspaceId(id)
    this.$router.go();
  },

  async deleteWorkspaceFromUserInfo({ commit, state, dispatch }, id) {
    const activeWorkspaceWasDeleted = state.user.activeWorkspaceId === id
    if(activeWorkspaceWasDeleted && state.user.workspaces.length !== 1) {
      const firstWorkspace = state.user.workspaces.filter(w => w.id !== id)[0]
      await dispatch("changeWorkspace", firstWorkspace.id)
    } else {
      commit("deleteWorkspaceFromUserInfo", id)
    }
  }
}
