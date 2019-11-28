export default {

  "signInUser": (data) => {
    return `
      mutation{
        signInUser(
          signInData:{
            email:"${ data.email }",
            password:"${ data.password }",
            timezoneOffset: ${ -(new Date().getTimezoneOffset() / 60) }
          }
        ){
          token
          user{ name }
        }
    }`
  },

  "signOutUser": () => {
    return `
      mutation{
        signOutUser{
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
            assignedDate: "${ data.assignedDate }",
            description: "${ data.description }",
            spentTime: ${ data.spentTime },
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
  },

  "updateTimeRecord": (data) => {
    return `
      mutation{
        updateTimeRecord(
          timeRecordId: "${ data.id }",
          startTask: ${ data.active },
          projectId: "${ data.project }"
          data: {
            description: "${ data.description }",
            spentTime: ${ data.spentTime },
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
  },

  "deleteTimeRecord": (data) => {
    return `
      mutation{
        deleteTimeRecord(
          timeRecordId: "${ data.id }"
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
  },

  "allTimeRecords": (date) => {
    return `query{
      allTimeRecords(
        date: "${ date }"
      ){
    		id,
        description,
        timeStart,
        spentTime,
        project {
          id
        },
      }
    }`
  },

  "personalInfo": () => {
    return `query{
      personalInfo{
    		name,
        email,
        timezone
      }
    }`
  }

}
