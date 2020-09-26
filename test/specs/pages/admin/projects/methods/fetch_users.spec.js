import createWrapper from '@/test/support/create_wrapper.js'
import Projects from '@/pages/admin/projects'

describe('fetchUsers', () => {
  const mocks = {
    $api: {
      getUsersByCurrentWorkspace: () => {},
      allProjects: () => { return { data: "" } }
    }
  }

  const successResponse = {
    data: [{ name: 'John', id: 11 }]
  }

  it("should call api method for fetching users", async () => {
    const methodStub = sinon.stub(mocks.$api, 'getUsersByCurrentWorkspace').returns(successResponse)
    const wrapper = createWrapper(Projects, { mocks }, fakeStoreData())

    await wrapper.vm.fetchUsers()
    expect(methodStub.called).to.be.true

    sinon.restore()
  });

  it('should keep users from recieved data if request was successful', async () => {
    const apiStub = sinon.stub(mocks.$api, "getUsersByCurrentWorkspace").returns(successResponse)
    const wrapper = createWrapper(Projects, { mocks }, fakeStoreData())

    await wrapper.vm.fetchUsers()
    expect(wrapper.vm.users).to.eql([{ name: 'John', id: 11 }])

    sinon.restore()
  })

});
