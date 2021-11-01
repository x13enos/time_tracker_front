import { DateTime } from 'luxon';

export default function state(){
  return {
    activeTaskIntervalId: null,
    projects: [],
    tags: [],
    tasks: {},
    counterOfPendingTasks: 0,
    pendingTasks: [],
    blockedDays: [],
    unapprovedPeriods: [],
    currentTask: null,
    currentDate: DateTime.local(),
    selectedDate: DateTime.local(),
    snack: {
      htmlContent: "",
      message: "",
      color: ""
    },
    user: {
      id: "",
      name: null,
      email: null,
      role: "",
      activeWorkspaceId: "",
      workspaces: []
    }
  }
}
