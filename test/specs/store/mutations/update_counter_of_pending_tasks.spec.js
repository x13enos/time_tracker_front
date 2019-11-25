import test from 'ava';
import mutations from '@/store/mutations'

const state = { counterOfPendingTasks: 1 }

test("it should update counter", t => {
  mutations.updateCounterOfPendingTasks(state, 1)
  t.is(state.counterOfPendingTasks, 2)
})
