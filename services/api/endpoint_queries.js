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
          user{
            id,
            name,
            email,
            timezone,
            role
          }
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

  "dailyTimeRecords": (date) => {
    return `query{
      dailyTimeRecords(
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
        id,
        name,
        email,
        timezone,
        role
      }
    }`
  },

  "updateUserProfile": (data) => {
    return `mutation{
      updateUserProfile(
        userData: {
          email:"${ data.email }",
          name:"${ data.name }",
          timezone: "${ data.timezone }",
          password: "${ data.password }"
      }){
        user{
          id,
          name,
          email,
          timezone,
          role
        }
      }
    }`
  },

  "allTimeRecords": (data) => {
    return `query{
      allTimeRecords(
        fromDate: ${ data.fromDate },
        toDate: ${ data.toDate },
        userId: "${ data.userId }"
      ){
    		totalSpentTime,
    		edges{
          node{
            description,
            spentTime,
            assignedDate,
            user{
              name
            },
            project {
              name
            }
          }
        }
      }
    }`
  },

  "generateReport": (data) => {
    return `mutation{
      generateReport(
        fromDate: ${ data.fromDate },
        toDate: ${ data.toDate },
        userId: "${ data.userId }"
      ){
        link
      }
    }`
  },

  "allUsers": () => {
    return `query{
      allUsers{
        id,
        name
      }
    }`
  }

}
