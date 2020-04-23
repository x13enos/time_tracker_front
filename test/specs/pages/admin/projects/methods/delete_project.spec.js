import createWrapper from '@/test/support/create_wrapper.js'
import Projects from '@/pages/admin/projects'

describe('deleteProject', () => {

  const methods = {
    fetchProjects: () => {},
    fetchUsers: () => {}
  }
  const mocks = {
    $api: { deleteProject: () => {} }
  }
  const successResponse = { data: { name: 'new-test-project', id: 1 } }

  it("should close dialog of deleting project", async () => {
    const methodStub = sinon.stub(mocks.$api, 'deleteProject').returns(successResponse)
    const wrapper = createWrapper(Projects, { methods, mocks }, fakeStoreData())
    wrapper.vm.projects = [{ id: 1, name: 'test-project' }]
    wrapper.vm.deletingProjectId = 1
    wrapper.vm.deleteDialog = true

    await wrapper.vm.deleteProject()
    expect(wrapper.vm.deleteDialog).to.be.false

    sinon.restore()
  });

  it("should call api method for deleting project", async () => {
    const methodStub = sinon.stub(mocks.$api, 'deleteProject').returns(successResponse)
    const wrapper = createWrapper(Projects, { methods, mocks }, fakeStoreData())
    wrapper.vm.projects = [{ id: 1, name: 'test-project' }]
    wrapper.vm.deletingProjectId = 1

    await wrapper.vm.deleteProject()
    expect(methodStub.calledOnceWith(1)).to.be.true

    sinon.restore()
  });

  it("should remove project from the list of projects", async () => {
    const methodStub = sinon.stub(mocks.$api, 'deleteProject').returns(successResponse)
    const wrapper = createWrapper(Projects, { methods, mocks }, fakeStoreData())
    wrapper.vm.projects = [{ id: 1, name: 'test-project' }]
    wrapper.vm.deletingProjectId = 1

    await wrapper.vm.deleteProject()
    expect(wrapper.vm.projects.length).to.eq(0)

    sinon.restore()
  });

  it("should show snack message", async () => {
    const methodStub = sinon.stub(mocks.$api, 'deleteProject').returns(successResponse)
    const wrapper = createWrapper(Projects, { methods, mocks }, fakeStoreData())
    wrapper.vm.projects = [{ id: 1, name: 'test-project' }]
    wrapper.vm.deletingProjectId = 1
    const snackStub = sinon.stub(wrapper.vm, "updateSnack")

    await wrapper.vm.deleteProject()
    expect(snackStub.calledOnceWith({ message: 'projects.was_deleted', color: "green" })).to.be.true

    sinon.restore()
  });

});
