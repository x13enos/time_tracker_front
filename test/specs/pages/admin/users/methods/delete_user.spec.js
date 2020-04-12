import createWrapper from '@/test/support/create_wrapper.js'
import Users from '@/pages/admin/users'

describe('deleteProject', () => {

  const methods = {
    fetchUsers: () => {}
  }
  const mocks = {
    $api: { deleteUser: () => {} }
  }
  const successResponse = { data: { name: 'new-test-project', id: 1 } }

  it("should close dialog of deleting user", async () => {
    const methodStub = sinon.stub(mocks.$api, 'deleteUser').returns(successResponse)
    const wrapper = createWrapper(Users, { methods, mocks }, fakeStoreData())
    wrapper.vm.users = [{ id: 1, name: 'test-user' }]
    wrapper.vm.deletingUserId = 1
    wrapper.vm.deleteDialog = true

    await wrapper.vm.deleteUser()
    expect(wrapper.vm.deleteDialog).to.be.false

    sinon.restore()
  });

  it("should call api method for deleting user", async () => {
    const methodStub = sinon.stub(mocks.$api, 'deleteUser').returns(successResponse)
    const wrapper = createWrapper(Users, { methods, mocks }, fakeStoreData())
    wrapper.vm.projects = [{ id: 1, name: 'test-user' }]
    wrapper.vm.deletingUserId = 1

    await wrapper.vm.deleteUser()
    expect(methodStub.calledOnceWith(1)).to.be.true

    sinon.restore()
  });

  it("should remove user from the list of users", async () => {
    const methodStub = sinon.stub(mocks.$api, 'deleteUser').returns(successResponse)
    const wrapper = createWrapper(Users, { methods, mocks }, fakeStoreData())
    wrapper.vm.projects = [{ id: 1, name: 'test-user' }]
    wrapper.vm.deletingProjectId = 1

    await wrapper.vm.deleteUser()
    expect(wrapper.vm.users.length).to.eq(0)

    sinon.restore()
  });

});
