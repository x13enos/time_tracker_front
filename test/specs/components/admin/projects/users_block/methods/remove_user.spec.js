import createWrapper from '@/test/support/create_wrapper.js'
import UsersBlock from '@/components/admin/projects/users_block'
import GlobalMethods from '@/services/global_methods'

describe('removeUser', () => {

  const propsData = {
    project: {
      id: 111,
      name: "test-project",
      user_ids: [1, 2, 3]
    },

    allUsers: []
  }

  const mocks = {
    $api: { removeUserFromProject: () => {} }
  }
  const successResponse = { data: {} }
  const user = { id: 2 }

  it('should call api method for removing user from project', () => {
    const methodStub = sinon.stub(mocks.$api, 'removeUserFromProject').returns(successResponse)
    const storeData = fakeStoreData()
    const wrapper = createWrapper(UsersBlock, { propsData, mocks }, storeData)

    wrapper.vm.removeUser(user)
    expect(methodStub.calledOnceWith(111, 2)).to.be.true

    sinon.restore()
  });

  it('should emit user id if api request was successful', async () => {
    const methodStub = sinon.stub(mocks.$api, 'removeUserFromProject').returns(successResponse)
    const storeData = fakeStoreData()
    const wrapper = createWrapper(UsersBlock, { propsData, mocks }, storeData)

    await wrapper.vm.removeUser(user)
    expect(wrapper.emitted("updateListOfUsers")[0]).to.eql(["remove", 2])

    sinon.restore()
  });
});
