import createWrapper from '@/test/support/create_wrapper.js'
import Projects from '@/pages/admin/projects'

describe('updateProject', () => {

  const methods = {
    fetchProjects: () => {},
    fetchUsers: () => {}
  }
  const mocks = {
    $api: { updateProject: () => {} }
  }
  const successResponse = { data: { name: 'new-test-project', id: 1 } }
  const projectData = { name: "new-test-project" }

  it("should call api method for updating project", () => {
    const methodStub = sinon.stub(mocks.$api, 'updateProject').returns(successResponse)
    const wrapper = createWrapper(Projects, { methods, mocks }, fakeStoreData())
    wrapper.vm.projects = [{ id: 1, name: 'test-project' }]

    wrapper.vm.updateProject(1, projectData)
    expect(methodStub.calledOnceWith(1, projectData)).to.be.true

    sinon.restore()
  });

  it("should replace project data in the list of projects", async () => {
    const methodStub = sinon.stub(mocks.$api, 'updateProject').returns(successResponse)
    const wrapper = createWrapper(Projects, { methods, mocks }, fakeStoreData())
    wrapper.vm.projects = [{ id: 1, name: 'test-project' }]

    await wrapper.vm.updateProject(1, projectData)
    expect(wrapper.vm.projects[0]).to.eql(successResponse.data)

    sinon.restore()
  });

});
