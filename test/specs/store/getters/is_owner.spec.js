import getters from '@/store/getters'

describe('isOwner', () => {
  it('should return false if user is admin', () => {
    const state = { user: { role: 'admin' } }
    expect(getters.isOwner(state)).to.be.false
  })

  it('should return true if user is owner', () => {
    const state = { user: { role: 'owner' } }
    expect(getters.isOwner(state)).to.be.true
  })

  it('should return false if user is staff', () => {
    const state = { user: { role: 'staff' } }
    expect(getters.isOwner(state)).to.be.false
  })

});
