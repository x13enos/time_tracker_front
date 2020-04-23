import createWrapper from '@/test/support/create_wrapper.js'
import UsersBlock from '@/components/admin/projects/users_block'
import GlobalMethods from '@/services/global_methods'

describe('assignUser', () => {

  const propsData = {
    project: {
      id: 111,
      name: "test-project",
      user_ids: [1, 2, 3]
    },

    allUsers: []
  }

  const mocks = {
    $api: { assignUserToProject: () => {} }
  }
  const successResponse = { data: {} }
  const user = { id: 2 }

  it('should call api method for assigning user to project', () => {
    const methodStub = sinon.stub(mocks.$api, 'assignUserToProject').returns(successResponse)
    const storeData = fakeStoreData()
    const wrapper = createWrapper(UsersBlock, { propsData, mocks }, storeData)

    wrapper.vm.assignUser(user)
    expect(methodStub.calledOnceWith(111, 2)).to.be.true

    sinon.restore()
  });

  it('should emit user id if api request was successful', async () => {
    const methodStub = sinon.stub(mocks.$api, 'assignUserToProject').returns(successResponse)
    const storeData = fakeStoreData()
    const wrapper = createWrapper(UsersBlock, { propsData, mocks }, storeData)

    await wrapper.vm.assignUser(user)
    expect(wrapper.emitted("updateListOfUsers")[0]).to.eql(["assign", 2])

    sinon.restore()
  });
});
