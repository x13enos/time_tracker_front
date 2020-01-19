
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

it('should update personal info', () => {
  mutations.updatePersonalInfo(state, userInfo)
  expect(state.user).to.eql(userInfo)
})
