
import mutations from '@/store/mutations'

const state = { counterOfPendingTasks: 1 }

it('should update counter', () => {
  mutations.updateCounterOfPendingTasks(state, 1)
  expect(state.counterOfPendingTasks).to.eq(2)
})
