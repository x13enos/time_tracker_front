import createWrapper from '@/test/support/create_wrapper.js'
import UsersBlock from '@/components/admin/workspaces/users_block'
import GlobalMethods from '@/services/global_methods'

describe('inviteUser', () => {

  const propsData = {
    workspace: {
      id: 111,
      name: "test-workspace"
    }
  }

  const mocks = {
    $api: { inviteUser: () => {} }
  }
  const successResponse = { data: { email: "admin@gmail.com" } }
  const user = { id: 2 }

  it('should call api method for inviting user', () => {
    const methodStub = sinon.stub(mocks.$api, 'inviteUser').returns(successResponse)
    const wrapper = createWrapper(UsersBlock, { propsData, mocks }, fakeStoreData())
    wrapper.vm.email = "admin@gmail.com"

    wrapper.vm.inviteUser(user)
    expect(methodStub.calledOnceWith(111, "admin@gmail.com")).to.be.true

    sinon.restore()
  });

  it('should add new user data to the list if api request was successful', async () => {
    sinon.stub(mocks.$api, 'inviteUser').returns(successResponse)
    const wrapper = createWrapper(UsersBlock, { propsData, mocks }, fakeStoreData())

    await wrapper.vm.inviteUser(user)
    expect(wrapper.vm.users).to.eql([{ email: "admin@gmail.com" }])

    sinon.restore()
  });

  it('should close form for inviting user in case of successful request', async () => {
    sinon.stub(mocks.$api, 'inviteUser').returns(successResponse)
    const wrapper = createWrapper(UsersBlock, { propsData, mocks }, fakeStoreData())
    const methodStub = sinon.stub(wrapper.vm, "closeDialogOfInvitingUser")

    await wrapper.vm.inviteUser(user)
    expect(methodStub.calledOnce).to.be.true

    sinon.restore()
  });
});
