import createWrapper from '@/test/support/create_wrapper.js'
import Workspaces from '@/pages/admin/workspaces'

describe('fetchUsers', () => {
  const mocks = {
    $api: {
      allUsers: () => {},
      allWorkspaces: () => { return { data: "" } }
    },
    $config: {
      extensionEnabled: false
    }
  }

  const successResponse = {
    data: [{ name: 'John', id: 11 }]
  }

  it("should call api method for fetching users", async () => {
    const methodStub = sinon.stub(mocks.$api, 'allUsers').returns(successResponse)
    const wrapper = createWrapper(Workspaces, { mocks }, fakeStoreData())

    await wrapper.vm.fetchUsers()
    expect(methodStub.called).to.be.true

    sinon.restore()
  });

  it('should keep users from recieved data if request was successful', async () => {
    const apiStub = sinon.stub(mocks.$api, "allUsers").returns(successResponse)
    const wrapper = createWrapper(Workspaces, { mocks }, fakeStoreData())

    await wrapper.vm.fetchUsers()
    expect(wrapper.vm.users).to.eql([{ name: 'John', id: 11 }])

    sinon.restore()
  })

});
