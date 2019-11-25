import test from 'ava';
import getters from '@/store/getters'

test("it should return true if number of pending tasks is more than 0", t => {
  const state = { counterOfPendingTasks: 4 }
  t.true(getters.somePendingTasks(state))
})

test("it should return false if number of pending tasks less or equal to 0", t => {
  const state = { counterOfPendingTasks: 0 }
  t.false(getters.somePendingTasks(state))
})
