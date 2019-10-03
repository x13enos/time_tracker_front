import handler from "@/services/api/handler"

function Api() {
  
  this.signIn = async (data) => {
    return handler.call(data, 'signInUser');
  }

}

export default new Api();
