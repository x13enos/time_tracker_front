import Handler from "@/services/api/handler"

function Api(router, store) {

  this.signIn = (data) => {
    return doRequest('signInUser', data);
  }

  this.signOut = () => {
    return doRequest('signOutUser');
  }

  this.allProjects = (data) => {
    return doRequest('allProjects');
  }

  this.createTimeRecord = (data) => {
    return doRequest('createTimeRecord', data);
  }

  this.updateTimeRecord = (data) => {
    return doRequest('updateTimeRecord', data);
  }

  this.deleteTimeRecord = (data) => {
    return doRequest('deleteTimeRecord', data);
  }

  this.dailyTimeRecords = (dateTime) => {
    return doRequest('dailyTimeRecords', dateTime);
  }

  this.personalInfo = () => {
    return doRequest('personalInfo');
  }

  this.updateUserProfile = (data) => {
    return doRequest('updateUserProfile', data);
  }

  this.allTimeRecords = (data) => {
    return doRequest('allTimeRecords', data);
  }

  this.allUsers = () => {
    return doRequest('allUsers');
  }

  this.generateReport = (data) => {
    return doRequest('generateReport', data);
  }

  // private logic

  const doRequest = async (actionName, data=null) => {
    const response = await new Handler().perform(actionName, data)
    showErrorForTestingStages(response)
    redirectIfUserUnathorized(response)
    return response
  }

  const redirectIfUserUnathorized = (response) => {
    if(response["code"] == "401"){
      router.push("/auth/sign-in")
    }
  }

  const showErrorForTestingStages = (response) => {
    if(!response.success() && process.env.NODE_ENV !== 'production')
      store.commit("updateSnack", { message: response.errors, color: "red" })
  }
}

export default Api;
