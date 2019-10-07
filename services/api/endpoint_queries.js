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
  },

  "allProjects": () => {
    return `
      query{
        allProjects  {
          id,
          name
        }
      }
    `
  },

  "createTimeRecord": (data) => {
    return `
      mutation{
        createTimeRecord(
          startTask: ${ data.active },
          projectId: "${ data.project }"
          data: {
            description: "${ data.description }",
            spentTime: ${ data.time },
          }
        ){
          timeRecord {
            id,
            description,
            spentTime,
            timeStart,
            project{
              id
            }
          }
        }
      }
    `
  }

}
