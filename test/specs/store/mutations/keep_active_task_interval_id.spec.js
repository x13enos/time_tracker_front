
import mutations from '@/store/mutations'

const state = {
  activeTaskIntervalId: null
}

it('should keep interval id of active task', () => {
  mutations.keepActiveTaskIntervalId(state, 24)
  expect(state.activeTaskIntervalId).to.eq(24)
})
