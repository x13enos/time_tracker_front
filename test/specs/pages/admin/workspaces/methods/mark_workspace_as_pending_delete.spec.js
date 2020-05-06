import createWrapper from '@/test/support/create_wrapper.js'
import Workspaces from '@/pages/admin/workspaces'

describe('markWorkspaceAsPendingDelete', () => {

  const methods = {
    fetchWorkspaces: () => {},
    fetchUsers: () => {}
  }

  it("should keep workspace id", () => {
    const wrapper = createWrapper(Workspaces, { methods }, fakeStoreData())

    wrapper.vm.markWorkspaceAsPendingDelete(1)
    expect(wrapper.vm.deletingWorkspaceId).to.eq(1)
  });

  it("should open dialog for approving process of deleting workspace", async () => {
    const wrapper = createWrapper(Workspaces, { methods }, fakeStoreData())
    wrapper.vm.deleteDialog = false

    wrapper.vm.markWorkspaceAsPendingDelete(1)
    expect(wrapper.vm.deleteDialog).to.be.true
  });

});
