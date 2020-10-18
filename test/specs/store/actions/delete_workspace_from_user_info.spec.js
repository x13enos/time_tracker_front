import actions from '@/store/actions';

describe("deleteWorkspaceFromUserInfo", () => {
  const commitObject = {
    commit: (type, payload) => {},
    dispatch: (type, payload) => {},
    state: {
      user: { activeWorkspaceId: 1 }
    }
  }

  it('should select first user workspace in case of deleting current one and having at least another one', async () => {
    commitObject.state.user.workspaces = [
      { id: 1, name: "test1" },
      { id: 2, name: "test2" }
    ]
    const dispatchStub = sinon.stub(commitObject, "dispatch")

    actions.deleteWorkspaceFromUserInfo(commitObject, 1)
    expect(dispatchStub.calledOnceWith("changeWorkspace", 2))
    sinon.restore()
  })

  it('should just remove workspace from user info', async () => {
    commitObject.state.user.workspaces = [
      { id: 1, name: "test1" },
      { id: 2, name: "test2" }
    ]
    const commitStub = sinon.stub(commitObject, "commit")

    actions.deleteWorkspaceFromUserInfo(commitObject, 2)
    expect(commitStub.calledOnceWith("deleteWorkspaceFromUserInfo", 2))
    sinon.restore()
  })
})
