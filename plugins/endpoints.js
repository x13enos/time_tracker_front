import axios from 'axios'

function makeRequest (query) {
  return axios.post('/api', { query })
}

export default {
  signIn (data) {
    const query = `
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
    return makeRequest(query)
  }
}
