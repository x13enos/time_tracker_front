import test from 'ava';
import mutations from '@/store/mutations'

const state = {
  user: {
    name: null,
    email: null,
    timezone: null
  }
}

const userInfo = {
  name: "John",
  email: "john@gmail.com",
  timezone: 'Athens'
}

test("it should update personal info", t => {
  mutations.updatePersonalInfo(state, userInfo)
  t.deepEqual(state.user, userInfo)
})
