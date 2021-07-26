import BlockedDaysSearcher from "@/services/blocked_days_searcher";
import { DateTime } from 'luxon';

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

  async fetchActiveTimeRecord({ commit }) {
    const response = await this.$api.activeTimeRecord()
    if (response.data)
      commit('updateCurrentTask', response.data)
  },

  async addTask ({ commit, dispatch }, { params, day }) {
    params.assignedDate = this.$appMethods.systemFormatDate(day)
    const response = await this.$api.createTimeRecord(params)
    dispatch("stopOtherTasks", params.active)
    await commit('updateTask', response.data)
    if (response.data.time_start)
      commit('updateCurrentTask', response.data)
    return response;
  },

  async updateTask ({ commit, dispatch }, params) {
    const response = await this.$api.updateTimeRecord(params)
    if (params.active === false) 
      await dispatch('handleStoppingTask', response.data)
    if (params.active === true)
      commit('updateCurrentTask', response.data)
    commit('updateTask', response.data)
    return response;
  },

  async handleStoppingTask({ commit, getters, dispatch }, taskData) {
    const parsedDate = taskData.assigned_date.split('/');
    await dispatch('updateSelectedDate', parsedDate);
    commit('updateCurrentTask', null);
  },

  async updateSelectedDate({ getters, commit, dispatch }, date) {
    const newDate = DateTime.fromObject({ year: date[2], month: date[1], day: date[0] });
    const needToFetchWeekTasks = !getters.weekDays.some(day => day.ts === newDate.ts);
    commit('updateSelectedDate', newDate);
    if (needToFetchWeekTasks)
      await dispatch('getWeeklyTasks', newDate);
  },

  async deleteTask ({ commit }, data) {
    const response = await this.$api.deleteTimeRecord(data)
    commit('deleteTask', data)
    return response;
  },

  stopOtherTasks ({ commit }, taskIsActive) {
    if(taskIsActive){
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
