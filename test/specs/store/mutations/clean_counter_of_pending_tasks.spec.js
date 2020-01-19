
import mutations from '@/store/mutations'

const state = { counterOfPendingTasks: 5 }

it('should clean counter of pending tasks', () => {
  mutations.cleanCounterOfPendingTasks(state)
  expect(state.counterOfPendingTasks).to.eq(0)
})
