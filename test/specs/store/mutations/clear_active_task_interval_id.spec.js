import test from 'ava';
import mutations from '@/store/mutations'

test("it should clean interval id of active task", t => {
  const state = { activeTaskIntervalId: 24 }
  mutations.clearActiveTaskIntervalId(state)
  t.is(state.activeTaskIntervalId, null)
})

test("it should clear interval", t => {
  const state = { activeTaskIntervalId: 24 }
  const clock = sinon.useFakeTimers()
  const clearIntervalStub = sinon.stub(clock, 'clearInterval')

  mutations.clearActiveTaskIntervalId(state)
  t.true(clearIntervalStub.calledOnce)
  t.deepEqual(clearIntervalStub.args[0], [24])

  clearIntervalStub.restore()
  clock.restore()
})
