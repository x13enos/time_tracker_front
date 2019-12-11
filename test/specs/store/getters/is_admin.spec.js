import test from 'ava';
import getters from '@/store/getters'

test("it should return true user is admin", t => {
  const state = { user: { role: 'admin' } }
  t.true(getters.isAdmin(state))
})

test("it should return false if user isn't admin", t => {
  const state = { user: { role: 'staff' } }
  t.false(getters.isAdmin(state))
})
