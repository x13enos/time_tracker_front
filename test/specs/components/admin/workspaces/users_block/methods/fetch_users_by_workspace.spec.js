import createWrapper from '@/test/support/create_wrapper.js'
import UsersBlock from '@/components/admin/workspaces/users_block'
import GlobalMethods from '@/services/global_methods'

describe('fetchUsersByWorkspace', () => {

  const propsData = {
    workspace: {
      id: 111,
      name: "test-workspace"
    },
  }

  const mocks = {
    $api: { getUsersByWorkspace: () => {} }
  }
  const successResponse = { data: [{ email: "admin@gmail.com" }] }

  it('should call api method for fetching users by workspace', () => {
    const methodStub = sinon.stub(mocks.$api, 'getUsersByWorkspace').returns(successResponse)
    const wrapper = createWrapper(UsersBlock, { propsData, mocks }, fakeStoreData())

    wrapper.vm.fetchUsersByWorkspace(111)
    expect(methodStub.calledOnceWith(111)).to.be.true

    sinon.restore()
  });

  it('should update list of users if api request was successful', async () => {
    sinon.stub(mocks.$api, 'getUsersByWorkspace').returns(successResponse)
    const wrapper = createWrapper(UsersBlock, { propsData, mocks }, fakeStoreData())

    await wrapper.vm.fetchUsersByWorkspace(111)
    expect(wrapper.vm.users).to.eql([{ email: "admin@gmail.com" }])

    sinon.restore()
  });
});
