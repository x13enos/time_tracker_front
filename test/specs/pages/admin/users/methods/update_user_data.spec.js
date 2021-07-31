import createWrapper from '@/test/support/create_wrapper.js'
import Users from '@/pages/admin/users'

describe('updateUserData', () => {

  const mocks = {
    $config: { extensionEnabled: true },
    $api: { getUsersForManaging: () => ({}) }
  }

  it("should update data for users list", () => {
    const wrapper = createWrapper(Users, { mocks }, fakeStoreData());
    wrapper.vm.users = [{
      id: 1,
      name: 'user-1'
    }];

    wrapper.vm.updateUserData({ id: 1, name: 'user-2' });
    expect(wrapper.vm.users[0]).to.eql({ id: 1, name: 'user-2' })
  });

});
