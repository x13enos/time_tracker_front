import createWrapper from '@/test/support/create_wrapper.js'
import Workspaces from '@/pages/workspaces'

describe('addNewWorkspace', () => {

  const mocks = {
    $config: { extensionEnabled: false },
    $api: { allWorkspaces: () => ({}) }
  }

  const workspaceData = { name: "test-workspace" }

  it("should add passed data to the list of workspaces", () => {
    const wrapper = createWrapper(Workspaces, { mocks }, fakeStoreData())

    wrapper.vm.addNewWorkspace(workspaceData)
    expect(wrapper.vm.workspaces[0]).to.eql(workspaceData)
  });

});
