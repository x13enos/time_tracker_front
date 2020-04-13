import createWrapper from '@/test/support/create_wrapper.js'
import Users from '@/pages/admin/users'

describe('fetchUsers', () => {
  const mocks = {
    $api: {
      allUsers: () => {},
    }
  }

  const successResponse = {
    data: [{ name: 'John', id: 11 }]
  }

  it("should call api method for fetching users", async () => {
    const methodStub = sinon.stub(mocks.$api, 'allUsers').returns(successResponse)
    const wrapper = createWrapper(Users, { mocks }, fakeStoreData())

    await wrapper.vm.fetchUsers()
    expect(methodStub.called).to.be.true

    sinon.restore()
  });

  it('should keep users from recieved data if request was successful', async () => {
    const apiStub = sinon.stub(mocks.$api, "allUsers").returns(successResponse)
    const wrapper = createWrapper(Users, { mocks }, fakeStoreData())

    await wrapper.vm.fetchUsers()
    expect(wrapper.vm.users).to.eql([{ name: 'John', id: 11 }])

    sinon.restore()
  })

});
