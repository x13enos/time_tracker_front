import getters from '@/store/getters'

it('should return true user is admin', () => {
  const state = { user: { role: 'admin' } }
  expect(getters.isAdmin(state)).to.be.true
})

it('should return false if user is not admin', () => {
  const state = { user: { role: 'staff' } }
  expect(getters.isAdmin(state)).to.be.false
})
