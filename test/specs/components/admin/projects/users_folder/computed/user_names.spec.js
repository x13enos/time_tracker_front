import createWrapper from '@/test/support/create_wrapper.js'
import UsersBlock from '@/components/admin/projects/users_block'
import GlobalMethods from '@/services/global_methods'

describe('userNames', () => {

  const propsData = {
    project: {
      name: "test-project",
      user_ids: [1, 2, 3]
    },

    allUsers: [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' },
      { id: 3, name: 'User 3' }
    ]
  }

  it('should return names only for two first assigned users', () => {
    const wrapper = createWrapper(UsersBlock, { propsData }, fakeStoreData())

    expect(wrapper.vm.userNames).to.eq("User 1, User 2")
  });
});
