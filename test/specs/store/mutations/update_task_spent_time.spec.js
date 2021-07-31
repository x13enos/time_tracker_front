import mutations from '@/store/mutations'

describe('mutation: updateTaskSpentTime', () => {
  const state = {
    currentTask: { spentTime: null }
  }

  it("should update tasks's spent time", () => {
    mutations.updateTaskSpentTime(state, 2.5)
    expect(state.currentTask.spentTime).to.eq(2.5)
  })
})
