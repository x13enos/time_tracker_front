import test from 'ava';
import mutations from '@/store/mutations'

const state = {
  activeTaskIntervalId: null
}

test("it should keep interval id of active task", t => {
  mutations.keepActiveTaskIntervalId(state, 24)
  t.is(state.activeTaskIntervalId, 24)
})
