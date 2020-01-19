
import getters from '@/store/getters'

it("should return true if user didn't sign in", () => {
  const state = {
    user: { name: "John Doe" }
  }
  expect(getters.userAuthorized(state)).to.be.true
})

it("should return false if user already signed in", () => {
  const state = {
    user: { name: null }
  }
  expect(getters.userAuthorized(state)).to.be.false
})
