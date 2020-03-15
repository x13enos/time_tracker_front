import mutations from '@/store/mutations'

describe('deletePendingTaskId', () => {

  it("should remove task's id from array", () => {
    const state = { pendingTasks: ["1929"] }
    mutations.deletePendingTaskId(state, "1929")
    expect(state.pendingTasks).to.eql([])
  })

  it("should try to remove task's id if that already was deleted", () => {
    const state = { pendingTasks: [] }
    const spy = sinon.spy(state.pendingTasks, "splice")

    mutations.deletePendingTaskId(state, "1929")

    expect(spy.called).to.be.false
    sinon.restore()
  })
})
