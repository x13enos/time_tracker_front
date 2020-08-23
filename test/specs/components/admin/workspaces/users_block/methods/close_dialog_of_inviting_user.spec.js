import createWrapper from '@/test/support/create_wrapper.js'
import UsersBlock from '@/components/admin/workspaces/users_block'
import GlobalMethods from '@/services/global_methods'

describe('closeDialogOfInvitingUser', () => {

  const propsData = {
    workspace: {
      name: "test-workspace"
    }
  }

  it('should change attribute newUser to false', () => {
    const wrapper = createWrapper(UsersBlock, { propsData }, fakeStoreData())
    wrapper.vm.newUser = true

    wrapper.vm.closeDialogOfInvitingUser()
    expect(wrapper.vm.newUser).to.be.false
  });

  it('should clean up email', () => {
    const wrapper = createWrapper(UsersBlock, { propsData }, fakeStoreData())
    wrapper.vm.email = "admin@gmail.com"

    wrapper.vm.closeDialogOfInvitingUser()
    expect(wrapper.vm.email).to.be.null
  });
});
