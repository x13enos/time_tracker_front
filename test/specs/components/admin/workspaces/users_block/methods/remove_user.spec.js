import createWrapper from '@/test/support/create_wrapper.js'
import UsersBlock from '@/components/admin/workspaces/users_block'
import GlobalMethods from '@/services/global_methods'

describe('removeUser', () => {

  const propsData = {
    workspace: {
      id: 111,
      name: "test-workspace"
    }
  }

  const mocks = {
    $api: { removeUserFromWorkspace: () => {} }
  }
  const successResponse = { data: {} }
  const user = { id: 2 }

  it('should call api method for removing user from workspaces', () => {
    const methodStub = sinon.stub(mocks.$api, 'removeUserFromWorkspace').returns(successResponse)
    const wrapper = createWrapper(UsersBlock, { propsData, mocks }, fakeStoreData())

    wrapper.vm.removeUser(user)
    expect(methodStub.calledOnceWith(111, 2)).to.be.true

    sinon.restore()
  });

  it('should emit remove user from list if api request was successful', async () => {
    const methodStub = sinon.stub(mocks.$api, 'removeUserFromWorkspace').returns(successResponse)
    const wrapper = createWrapper(UsersBlock, { propsData, mocks }, fakeStoreData())
    wrapper.vm.users = [{ id: 1 }, { id: 2}]

    await wrapper.vm.removeUser(user)
    expect(wrapper.vm.users).to.eql([{ id: 1 }])

    sinon.restore()
  });

});
