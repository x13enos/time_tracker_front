import mutations from '@/store/mutations'

describe('changeWorkspaceInfo', () => {
  const state = {
    user: {
      workspaces: [
        { id: 1, name: "test" },
        { id: 2, name: "test2" }
      ]
    }
  }

  it('should find and updated info for passed workspace', () => {
    mutations.changeWorkspaceInfo(state, { id: 2, name: "new name" })
    expect(state.user.workspaces).to.eql([
      { id: 1, name: "test" },
      { id: 2, name: "new name" }
    ])
  })
});
