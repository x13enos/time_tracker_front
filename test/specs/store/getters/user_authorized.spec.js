import test from 'ava';
import getters from '@/store/getters'

test("it should return true if user didn't sign in", t => {
  const state = {
    user: { name: "John Doe" }
  }
  t.true(getters.userAuthorized(state))
})

test("it should return false if user already signed in", t => {
  const state = {
    user: { name: null }
  }
  t.false(getters.userAuthorized(state))
})
