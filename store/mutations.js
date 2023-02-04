import Vue from 'vue'

export default {
  updatePersonalInfo (state, userData) {
    const {
      id, name, email, locale, role, workspaces, timezone,
       active_workspace_id: activeWorkspaceId,
       telegram_token: telegramToken,
       telegram_active: telegramActive,
       notification_settings: notificationSettings
    } = userData

    Object.assign(state.user, {
      id, name, email, locale, role, activeWorkspaceId, workspaces, timezone,
      telegramToken, telegramActive, notificationSettings
    })
    state.unapprovedPeriods = userData.unapproved_periods || []
    this.$i18n.locale = locale

    localStorage.setItem('locale', locale)
  },

  updateProjects(state, projects) {
    state.projects = projects
  },

  updateTags(state, tags) {
    state.tags = tags
  },

  updateTasks(state, data) {
    data.time_records.forEach((timeRecord) => {
      Vue.set(state.tasks[timeRecord.assigned_date], timeRecord.id, collectTaskData(timeRecord));
    })

    if(this.app.$config.extensionEnabled){
      state.blockedDays = data.blocked_days
    }
  },

  updateCurrentTask(state, task) {
    state.currentTask = task ? collectTaskData(task) : null;
  },

  updateTask(state, data){
    Vue.set(state.tasks[data.assigned_date], data.id, collectTaskData(data));
  },

  deleteTask(state, { assignedDate, id }){
    Vue.delete(state.tasks[assignedDate], id)
  },

  updateTaskSpentTime(state, spentTime){
    state.currentTask.spentTime = spentTime;
  },

  keepActiveTaskIntervalId(state, intervalId){
    state.activeTaskIntervalId = intervalId
  },

  clearActiveTaskIntervalId(state){
    clearInterval(state.activeTaskIntervalId)
    state.activeTaskIntervalId = null
  },

  cleanTasksStartTime(state){
    const stateTasks = Object.assign({}, state.tasks)

    Object.values(stateTasks).forEach((dailyTasks) => {
      Object.values(dailyTasks).forEach((task) => { task.timeStart = null })
    })

    Vue.set(state, 'tasks', stateTasks);
  },

  reinitTasksObject(state, day){
    const beginningOfWeek = day.startOf("week");
    const stateTasks = {};

    ([...Array(7).keys()]).forEach((i) => {
      let dayString = this.$appMethods.systemFormatDate(beginningOfWeek.plus({ "days": i }))
      stateTasks[dayString] = {}
    })

    Vue.set(state, 'tasks', stateTasks);
  },

  updateSnack(state, data){
    state.snack = data
  },

  updateCounterOfPendingTasks(state, number){
    state.counterOfPendingTasks += number
  },

  cleanCounterOfPendingTasks(state){
    state.counterOfPendingTasks = 0
  },

  addPendingTaskId(state, id){
    const tasks = state.pendingTasks
    if(!tasks.includes(id))
      tasks.push(id)
  },

  deletePendingTaskId(state, id){
    const tasks = state.pendingTasks
    if(tasks.includes(id))
      tasks.splice( tasks.indexOf(id), 1 );
  },

  removeUnapprovedTimePeriod(state, id) {
    const periodIndex = state.unapprovedPeriods.findIndex(p => p.id === id)
    state.unapprovedPeriods.splice(periodIndex, 1)
  },

  addWorkspaceToUserInfo(state, workspaceInfo) {
    state.user.workspaces.push(workspaceInfo);
  },

  changeWorkspaceInfo(state, workspaceInfo) {
    const changedWorkspace = state.user.workspaces.find(w => w.id === workspaceInfo.id);
    Object.assign(changedWorkspace, workspaceInfo);
  },

  deleteWorkspaceFromUserInfo(state, id) {
    const workspaceIndex = state.user.workspaces.findIndex(w => w.id === id);
    state.user.workspaces.splice(workspaceIndex, 1);
  },

  updateBlockedDays(state, days) {
    state.blockedDays = days;
  },

  updateSelectedDate(state, date) {
    state.selectedDate = date;
  },

  updateCurrentDate(state, date) {
    state.currentDate = date;
  }
}

function collectTaskData(taskData){
  return {
    id: taskData.id,
    project: taskData.project_id,
    description: taskData.description,
    spentTime: taskData.spent_time,
    timeStart: taskData.time_start,
    assignedDate: taskData.assigned_date,
    tagIds: taskData.tag_ids
  }
}
