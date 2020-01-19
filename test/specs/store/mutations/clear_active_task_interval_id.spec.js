
import mutations from '@/store/mutations'

it('should clean interval id of active task', () => {
  const state = { activeTaskIntervalId: 24 }
  mutations.clearActiveTaskIntervalId(state)
  expect(state.activeTaskIntervalId).to.eq(null)
})

it('should clear interval', () => {
  const state = { activeTaskIntervalId: 24 }
  const clock = sinon.useFakeTimers()
  const clearIntervalStub = sinon.stub(clock, 'clearInterval')

  mutations.clearActiveTaskIntervalId(state)
  expect(clearIntervalStub.calledOnce).to.be.true
  expect(clearIntervalStub.args[0]).to.eql([24])

  clearIntervalStub.restore()
  clock.restore()
})
