
import getters from '@/store/getters'

it('should return true if number of pending tasks is more than 0', () => {
  const state = { counterOfPendingTasks: 4 }
  expect(getters.somePendingTasks(state)).to.be.true
})

it('should return false if number of pending tasks less or equal to 0', () => {
  const state = { counterOfPendingTasks: 0 }
  expect(getters.somePendingTasks(state)).to.be.false
})
