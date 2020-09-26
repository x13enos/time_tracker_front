import createWrapper from '@/test/support/create_wrapper.js'
import Projects from '@/pages/admin/projects'

describe('fetchProjects', () => {
  const mocks = {
    $api: {
      getUsersByCurrentWorkspace: () => { return { data: "" } },
      allProjects: () => {}
    }
  }

  const successResponse = {
    data: [{ name: 'Project', id: 11 }]
  }

  it("should call api method for fetching projects", async () => {
    const methodStub = sinon.stub(mocks.$api, 'allProjects').returns(successResponse)
    const wrapper = createWrapper(Projects, { mocks }, fakeStoreData())

    await wrapper.vm.fetchProjects()
    expect(methodStub.called).to.be.true

    sinon.restore()
  });

  it('should keep projects from recieved data if request was successful', async () => {
    const apiStub = sinon.stub(mocks.$api, "allProjects").returns(successResponse)
    const wrapper = createWrapper(Projects, { mocks }, fakeStoreData())

    await wrapper.vm.fetchProjects()
    expect(wrapper.vm.projects).to.eql([{ name: 'Project', id: 11 }])

    sinon.restore()
  })

});
