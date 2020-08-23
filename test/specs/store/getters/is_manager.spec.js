import getters from '@/store/getters'

describe('isManager', () => {
  it('should return true user is admin', () => {
    const state = { user: { role: 'admin' } }
    expect(getters.isManager(state)).to.be.true
  })

  it('should return true if user is owner', () => {
    const state = { user: { role: 'owner' } }
    expect(getters.isManager(state)).to.be.true
  })

  it('should return false if user is staff', () => {
    const state = { user: { role: 'staff' } }
    expect(getters.isManager(state)).to.be.false
  })

});
