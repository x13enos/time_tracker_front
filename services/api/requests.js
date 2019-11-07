import Handler from "@/services/api/handler"

function Api(router) {

  this.signIn = (data) => {
    return doRequest('signInUser', data);
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

  this.allTimeRecords = (dateTime) => {
    return doRequest('allTimeRecords', dateTime);
  }

  // private logic

  const doRequest = async (actionName, data=null) => {
    const response = await new Handler().perform(actionName, data)
    redirectIfUserUnathorized(response)
    return response
  }

  const redirectIfUserUnathorized = (response) => {
    if(response["code"] == "401"){
      router.push("/auth/sign-in")
    }
  }

}

export default Api;
