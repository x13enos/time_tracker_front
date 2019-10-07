import handler from "@/services/api/handler"

function Api() {

  this.signIn = async (data) => {
    return handler.perform('signInUser', data);
  }

  this.allProjects = async (data) => {
    return handler.perform('allProjects');
  }

  this.createTimeRecord = async (data) => {
    return handler.perform('createTimeRecord', data);
  }
}

export default new Api();
