import createWrapper from '@/test/support/create_wrapper.js'
import UsersBlock from '@/components/admin/projects/users_block'
import GlobalMethods from '@/services/global_methods'

describe('notAssignedUsers', () => {

  const propsData = {
    project: {
      name: "test-project",
      user_ids: [1]
    },

    allUsers: [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' }
    ]
  }

  it('should return list of users which were not assigned to project', () => {
    const wrapper = createWrapper(UsersBlock, { propsData }, fakeStoreData())

    expect(wrapper.vm.notAssignedUsers).to.eql([{ id: 2, name: 'User 2' }])
  });
});
