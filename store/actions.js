import endpoints from '~/plugins/endpoints.js'

function handleResponse (response, actionMethod) {
  if (response.data.data != null) {
    return { status: 'success', data: response.data.data[actionMethod] }
  } else {
    return { status: 'fail', errors: response.data.errors[0].message }
  }
}

export default {
  async signIn ({ commit }, data) {
    const response = handleResponse(await endpoints.signIn(data), 'signInUser')
    if (response.status === 'success') {
      commit('updateUserData', response.data)
    }
    return response
  }
}
