import mutations from '@/store/mutations'

describe('addPendingTaskId', () => {

  it("should add task's id to the array", () => {
    const state = { pendingTasks: [] }
    mutations.addPendingTaskId(state, "1929")
    expect(state.pendingTasks).to.eql(["1929"])
  })

  it("should not add task's id to the array if it's already existed", () => {
    const state = { pendingTasks: ["1929"] }
    const spy = sinon.spy(state.pendingTasks, "push")

    mutations.addPendingTaskId(state, "1929")

    expect(spy.called).to.be.false
    sinon.restore()
  })
})
