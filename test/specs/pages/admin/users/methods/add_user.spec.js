import createWrapper from '@/test/support/create_wrapper.js'
import Users from '@/pages/admin/users'

describe('addUser', () => {
  const methods = {
    fetchUsers: () => {}
  }

  it("should push passed users's data to the list", () => {
    const wrapper = createWrapper(Users, { methods }, fakeStoreData())

    wrapper.vm.addUser({ name: "new user" })
    expect(wrapper.vm.users).to.eql([{ name: "new user" }])
  });

});
