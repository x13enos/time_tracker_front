import createWrapper from '@/test/support/create_wrapper.js'
import UsersBlock from '@/components/admin/workspaces/users_block'
import GlobalMethods from '@/services/global_methods'

describe('appropriateUser', () => {

  const propsData = {
    workspace: {
      id: 111,
      name: "test-workspace"
    },
  }

  it('should return false if passed and current user is same person', () => {
    const storeData = fakeStoreData()
    storeData.state.user = { id: 15, role: "admin" }
    const wrapper = createWrapper(UsersBlock, { propsData }, storeData)

    expect(wrapper.vm.appropriateUser({ id: 15, role: "admin" })).to.be.false
  });

  it('should return false if passed user is owner', () => {
    const storeData = fakeStoreData()
    storeData.state.user = { id: 15, role: "admin" }
    const wrapper = createWrapper(UsersBlock, { propsData }, storeData)

    expect(wrapper.vm.appropriateUser({ id: 15, role: "owner" })).to.be.false
  });

  it('should return true if passed user is not owner or/and current user', () => {
    const storeData = fakeStoreData()
    storeData.state.user = { id: 15, role: "admin" }
    const wrapper = createWrapper(UsersBlock, { propsData }, storeData)

    expect(wrapper.vm.appropriateUser({ id: 18, role: "staff" })).to.be.true
  });
});
