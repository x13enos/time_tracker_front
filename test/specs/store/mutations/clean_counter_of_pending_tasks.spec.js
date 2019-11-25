import test from 'ava';
import mutations from '@/store/mutations'

const state = { counterOfPendingTasks: 5 }

test("it should clean counter of pending tasks", t => {
  mutations.cleanCounterOfPendingTasks(state)
  t.is(state.counterOfPendingTasks, 0)
})
