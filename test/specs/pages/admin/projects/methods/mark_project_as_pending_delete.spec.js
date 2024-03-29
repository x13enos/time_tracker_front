import createWrapper from '@/test/support/create_wrapper.js'
import Projects from '@/pages/admin/projects'

describe('markProjectAsPendingDelete', () => {

  const mocks = {
    $api: {
      allProjects: () => ({}),
      getUsersByCurrentWorkspace: () => ({})
    }
  }

  it("should keep project id", () => {
    const wrapper = createWrapper(Projects, { mocks }, fakeStoreData())

    wrapper.vm.markProjectAsPendingDelete(1)
    expect(wrapper.vm.deletingProjectId).to.eq(1)
  });

  it("should open dialog for approving process of deleting project", async () => {
    const wrapper = createWrapper(Projects, { mocks }, fakeStoreData())
    wrapper.vm.deleteDialog = false

    wrapper.vm.markProjectAsPendingDelete(1)
    expect(wrapper.vm.deleteDialog).to.be.true
  });

});
