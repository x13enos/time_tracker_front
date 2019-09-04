import test from 'ava'
import mutations from "../../../../store/mutations"

// export default {
//   updateUserData (state, userData) {
//     localStorage.setItem('authToken', userData.token)
//     state.user.name = userData.user.name
//     this.$router.replace({ path: '/' })
//   }
// }

const state = {
  user: {
    name: ""
  }
}

const userData = {
  token: "21381263128738123",
  user: {
    name: "John Doe"
  }
}

test("it should update user name", t => {
  mutations.updateUserData(state, userData)
  t.is(state.user.name, "John Doe")
})
