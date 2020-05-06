import createWrapper from '@/test/support/create_wrapper.js'
import UsersBlock from '@/components/admin/workspaces/users_block'
import GlobalMethods from '@/services/global_methods'

describe('closeDialog', () => {

  const propsData = {
    workspace: {
      name: "test-workspace",
      user_ids: [1, 2, 3]
    },

    allUsers: []
  }

  it('should call method for closing dialog of inviting user', () => {
    const wrapper = createWrapper(UsersBlock, { propsData }, fakeStoreData())
    const methodStub = sinon.stub(wrapper.vm, "closeDialogOfInvitingUser")

    wrapper.vm.closeDialog()
    expect(methodStub.calledOnce).to.be.true

    sinon.restore()
  });

  it('should change dialog attribute to false', () => {
    const wrapper = createWrapper(UsersBlock, { propsData }, fakeStoreData())
    wrapper.vm.dialog = true

    wrapper.vm.closeDialog()
    expect(wrapper.vm.dialog).to.be.false
  });
});
