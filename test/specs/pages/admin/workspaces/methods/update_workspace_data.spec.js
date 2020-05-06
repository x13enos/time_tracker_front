import createWrapper from '@/test/support/create_wrapper.js'
import Workspaces from '@/pages/admin/workspaces'

describe('updateWorkspaceData', () => {

  const methods = {
    fetchWorkspaces: () => {},
    fetchUsers: () => {}
  }
  const workspaceData = { name: "new-test-workspace", id: 1  }

  it("should replace workspace data in the list of workspaces", async () => {
    const wrapper = createWrapper(Workspaces, { methods }, fakeStoreData())
    wrapper.vm.workspaces = [{ id: 1, name: 'test-workspace' }]

    await wrapper.vm.updateWorkspaceData(1, workspaceData)
    expect(wrapper.vm.workspaces[0]).to.eql({ id: 1, name: "new-test-workspace" })

  });

});
