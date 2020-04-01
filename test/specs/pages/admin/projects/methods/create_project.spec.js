import createWrapper from '@/test/support/create_wrapper.js'
import Projects from '@/pages/admin/projects'

describe('createProject', () => {

  const methods = {
    fetchProjects: () => {},
    fetchUsers: () => {}
  }
  const mocks = {
    $api: { createProject: () => {} }
  }
  const successResponse = { data: [{ name: 'test-project', id: 11 }] }
  const projectData = { name: "test-project" }

  it("should call api method for creating project", () => {
    const methodStub = sinon.stub(mocks.$api, 'createProject').returns(successResponse)
    const wrapper = createWrapper(Projects, { methods, mocks }, fakeStoreData())

    wrapper.vm.createProject(projectData)
    expect(methodStub.calledOnceWith(projectData)).to.be.true

    sinon.restore()
  });

  it("should add project data to the list of projects", async () => {
    const methodStub = sinon.stub(mocks.$api, 'createProject').returns(successResponse)
    const wrapper = createWrapper(Projects, { methods, mocks }, fakeStoreData())

    await wrapper.vm.createProject(projectData)
    expect(wrapper.vm.projects[0]).to.eql(successResponse.data)

    sinon.restore()
  });

});
