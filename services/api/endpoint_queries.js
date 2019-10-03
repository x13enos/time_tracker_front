export default {

  "signInUser": (data) => {
    return `
      mutation{
        signInUser(
          signInData:{
            email:"${data.email}",
            password:"${data.password}"
          }
        ){
          token
          user{ name }
        }
    }`
  }
  
}
