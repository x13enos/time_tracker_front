import mutations from '@/store/mutations'

describe('deleteWorkspaceFromUserInfo', () => {
  const state = {
    user: {
      workspaces: [
        { id: 1, name: "test" },
        { id: 2, name: "test2" }
      ]
    }
  }

  it('should find and delete workspace from the list of user workspaces', () => {
    mutations.deleteWorkspaceFromUserInfo(state, 2)
    expect(state.user.workspaces).to.eql([
      { id: 1, name: "test" }
    ])
  })
});
