import getters from '@/store/getters'

describe('somePendingTasks', () => {
  it('should return true if number of pending tasks is more than 0', () => {
    const state = { pendingTasks: [1,2,3,4] }
    expect(getters.somePendingTasks(state)).to.be.true
  })

  it('should return false if number of pending tasks less or equal to 0', () => {
    const state = { pendingTasks: [] }
    expect(getters.somePendingTasks(state)).to.be.false
  })
});
