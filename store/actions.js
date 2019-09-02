import endpoints from '~/plugins/endpoints.js'

function handleResponse (response, successFn) {
  if (response.data.data != null) {
    successFn()
  } else {
    return response.data.errors[0].message
  }
}

export default {
  async signIn ({ commit }, data) {
    const response = await endpoints.signIn(data)
    return handleResponse(
      response,
      function () { commit('updateUserData', response.data.data.signInUser) }
    )
  }
}
