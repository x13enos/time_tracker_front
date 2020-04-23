import createWrapper from '@/test/support/create_wrapper.js'
import UsersBlock from '@/components/admin/projects/users_block'
import GlobalMethods from '@/services/global_methods'

describe('isNotCurrentUser', () => {

  const propsData = {
    project: {
      name: "test-project",
      user_ids: [1, 2, 3]
    },

    allUsers: []
  }

  it('should return true if passed user is not current', () => {
    const storeData = fakeStoreData()
    storeData.state.user.id = 1
    const wrapper = createWrapper(UsersBlock, { propsData }, storeData)
    const user = { id: 2 }

    expect(wrapper.vm.isNotCurrentUser(user)).to.be.true
  });

  it('should return false if passed user is current', () => {
    const storeData = fakeStoreData()
    storeData.state.user.id = 1
    const wrapper = createWrapper(UsersBlock, { propsData }, storeData)
    const user = { id: 1 }

    expect(wrapper.vm.isNotCurrentUser(user)).to.be.false
  });
});
