import mutations from '@/store/mutations'

describe('addWorkspaceToUserInfo', () => {
  const state = {
    user: {
      workspaces: [ { id: 1, name: "test" }]
    }
  }

  it('should add passed workspace to the list of user workspaces', () => {
    mutations.addWorkspaceToUserInfo(state, { id: 2, name: "test2" })
    expect(state.user.workspaces).to.eql([
      { id: 1, name: "test" },
      { id: 2, name: "test2" }
    ])
  })
});
