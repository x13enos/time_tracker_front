import createWrapper from '@/test/support/create_wrapper.js'
import Users from '@/pages/admin/users'

describe('fetchUsers', () => {
  const mocks = {
    $api: {
      getUsersForManaging: () => {}
    },
    $config: {
      extensionEnabled: true
    }
  }

  const successResponse = {
    data: [{ name: 'super admin', role: 'admin', id: 1 }]
  }

  it("should call api method for fetching users", async () => {
    const methodStub = sinon.stub(mocks.$api, 'getUsersForManaging').returns(successResponse)
    const wrapper = createWrapper(Users, { mocks }, fakeStoreData())

    await wrapper.vm.fetchUsers()
    expect(methodStub.called).to.be.true

    sinon.restore()
  });

  it('should keep users from recieved data if request was successful', async () => {
    const apiStub = sinon.stub(mocks.$api, "getUsersForManaging").returns(successResponse)
    const wrapper = createWrapper(Users, { mocks }, fakeStoreData())

    await wrapper.vm.fetchUsers()
    expect(wrapper.vm.users).to.eql([{ id: 1, name: 'super admin', role: 'admin' }])

    sinon.restore()
  })

});
