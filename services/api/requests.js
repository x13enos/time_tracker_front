import axios from 'axios';

function Api({ router, store }, appMethods) {

  this.signIn = (data) => {
    return client.post("/auth", {
      email: data.email,
      password: data.password
    })
  }

  this.signOut = () => {
    return client.delete("/auth")
  }

  this.allProjects = (data) => {
    return client.get("/projects")
  }

  this.createTimeRecord = (data) => {
    return client.post("/time_records", {
      start_task: data.active,
      description: data.description,
      project_id: data.project,
      spent_time: data.spentTime,
      assigned_date: data.assignedDate
    })
  }

  this.updateTimeRecord = (data) => {
    return client.put(`/time_records/${data.id}`, {
      start_task: data.active,
      description: data.description,
      project_id: data.project,
      spent_time: data.spentTime
    })
  }

  this.deleteTimeRecord = (data) => {
    return client.delete(`/time_records/${data.id}`)
  }

  this.weeklyTimeRecords = (date) => {
    const assigned_date = date.toLocaleString({ locale: 'en-gb' });
    return client.get("/time_records", { params: { assigned_date } })
  }

  this.personalInfo = () => {
    return client.get("/auth")
  }

  this.updateUserProfile = (data) => {
    return client.put("/users", data)
  }

  this.allTimeRecords = (data) => {
    return client.get("/reports", { params: {
      from_date: data.fromDate,
      to_date: data.toDate,
      user_id: data.userId
    } })
  }

  this.allUsers = () => {
    return client.get("/users")
  }

  this.generateReport = (data) => {
    return client.get("/reports", { params: {
      from_date: data.fromDate,
      to_date: data.toDate,
      user_id: data.userId,
      pdf: true
    } })
  }

  this.createProject = (data) => {
    return client.post("/projects", data)
  }

  this.updateProject = (id, data) => {
    return client.put(`/projects/${id}`, data)
  }

  this.deleteProject = (id) => {
    return client.delete(`/projects/${id}`)
  }

  this.assignUserToProject = (projectId, userId) => {
    return client.put(`/projects/${projectId}/assign_user`, { user_id: userId })
  }

  this.removeUserFromProject = (projectId, userId) => {
    return client.put(`/projects/${projectId}/remove_user`, { user_id: userId })
  }

  this.forgotPassword = (email) => {
    return client.post("/users/passwords", { email })
  }

  this.changePassword = (data) => {
    return client.put(`/users/passwords`, data)
  }

  this.setPassword = (data) => {
    return client.put(`/users/invitations`, data)
  }

  this.allWorkspaces = () => {
    return client.get("/workspaces")
  }

  this.createWorkspace = (data) => {
    return client.post("/workspaces", data)
  }

  this.updateWorkspace = (id, data) => {
    return client.put(`/workspaces/${id}`, data)
  }

  this.deleteWorkspace = (id) => {
    return client.delete(`/workspaces/${id}`)
  }

  this.removeUserFromWorkspace = (workspaceId, userId) => {
    return client.delete(`/workspaces/${workspaceId}/workspace_users/${userId}`)
  }

  this.inviteUser = (workspaceId, email) => {
    return client.post(`/workspaces/${workspaceId}/workspace_users/`, { email } )
  }

  // private logic

  const client = axios.create({
    baseURL: '/api'
  });

  client.defaults.headers.common['Accept'] = 'application/json'

  client.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    showError(error.response)
    redirectIfUserUnathorized(error.response)
    return Promise.reject(error.response.data.error);
  });


  const redirectIfUserUnathorized = (response) => {
    if(response.status === 401){
      router.push("/auth/sign-in")
    }
  }

  const showError = (response) => {
    const itIsNotAuthPage = document.location.pathname.match("/auth/") === null;
    if(itIsNotAuthPage){
      store.commit("updateSnack", { message: response.data.error, color: "red" });
    }
  }
}

export default Api;
