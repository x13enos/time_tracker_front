import createWrapper from '@/test/support/create_wrapper.js'
import Workspaces from '@/pages/admin/workspaces'

describe('addNewWorkspace', () => {

  const methods = {
    fetchWorkspaces: () => {},
    fetchUsers: () => {}
  }

  const mocks = {
    $config: {
      extensionEnabled: false
    }
  }

  const workspaceData = { name: "test-workspace" }

  it("should add passed data to the list of workspaces", () => {
    const wrapper = createWrapper(Workspaces, { methods, mocks }, fakeStoreData())

    wrapper.vm.addNewWorkspace(workspaceData)
    expect(wrapper.vm.workspaces[0]).to.eql(workspaceData)
  });

});
