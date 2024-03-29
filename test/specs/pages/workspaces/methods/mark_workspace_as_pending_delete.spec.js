import createWrapper from '@/test/support/create_wrapper.js'
import Workspaces from '@/pages/workspaces'

describe('markWorkspaceAsPendingDelete', () => {

  const mocks = {
    $config: { extensionEnabled: false },
    $api: { allWorkspaces: () => ({}) }
  }

  it("should keep workspace id", () => {
    const wrapper = createWrapper(Workspaces, { mocks }, fakeStoreData())

    wrapper.vm.markWorkspaceAsPendingDelete(1)
    expect(wrapper.vm.deletingWorkspaceId).to.eq(1)
  });

  it("should open dialog for approving process of deleting workspace", async () => {
    const wrapper = createWrapper(Workspaces, { mocks }, fakeStoreData())
    wrapper.vm.deleteDialog = false

    wrapper.vm.markWorkspaceAsPendingDelete(1)
    expect(wrapper.vm.deleteDialog).to.be.true
  });

});
