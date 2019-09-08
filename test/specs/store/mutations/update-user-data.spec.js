import test from 'ava';
import mutations from '@/store/mutations'

const state = {
  user: {
    name: ""
  }
}

const passedData = {
  user: {
    name: "John Doe"
  }
}

test("it should update user data", t => {
  mutations.updateUserData(state, passedData)
  t.is(state.user.name, "John Doe")
})
