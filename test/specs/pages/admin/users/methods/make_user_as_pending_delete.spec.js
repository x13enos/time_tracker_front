import createWrapper from '@/test/support/create_wrapper.js'
import Users from '@/pages/admin/users'

describe('markUserAsPendingDelete', () => {

  const methods = {
    fetchUsers: () => {}
  }

  it("should keep user id", () => {
    const wrapper = createWrapper(Users, { methods }, fakeStoreData())

    wrapper.vm.markUserAsPendingDelete(1)
    expect(wrapper.vm.deletingUserId).to.eq(1)
  });

  it("should open dialog for approving process of deleting user", () => {
    const wrapper = createWrapper(Users, { methods }, fakeStoreData())
    wrapper.vm.deleteDialog = false

    wrapper.vm.markUserAsPendingDelete(1)
    expect(wrapper.vm.deleteDialog).to.be.true
  });

});
