import getters from '@/store/getters'

it("should return true if user didn't sign in", () => {
  const state = {
    user: { email: "user@gmail.com" }
  }
  expect(getters.userAuthorized(state)).to.be.true
})

it("should return false if user already signed in", () => {
  const state = {
    user: { email: null }
  }
  expect(getters.userAuthorized(state)).to.be.false
})
