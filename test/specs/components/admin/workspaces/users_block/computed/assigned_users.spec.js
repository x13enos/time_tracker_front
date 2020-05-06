import createWrapper from '@/test/support/create_wrapper.js'
import UsersBlock from '@/components/admin/workspaces/users_block'
import GlobalMethods from '@/services/global_methods'

describe('assignedUsers', () => {

  const propsData = {
    workspace: {
      name: "test-workspace",
      user_ids: [1]
    },

    allUsers: [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' }
    ]
  }

  it('should return list of users which were assigned to workspace', () => {
    const wrapper = createWrapper(UsersBlock, { propsData }, fakeStoreData())

    expect(wrapper.vm.assignedUsers).to.eql([{ id: 1, name: 'User 1' }])
  });
});
