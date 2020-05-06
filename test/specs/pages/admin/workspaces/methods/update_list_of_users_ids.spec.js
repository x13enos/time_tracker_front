import createWrapper from '@/test/support/create_wrapper.js'
import Workspaces from '@/pages/admin/workspaces'

describe('updateListOfUserIds', () => {
  const methods = {
    fetchWorkspaces: () => {},
    fetchUsers: () => {}
  }

  it("should add passed id to the project user ids list", () => {
    const wrapper = createWrapper(Workspaces, { methods }, fakeStoreData())
    wrapper.vm.workspaces = [{ user_ids: [1] }]

    wrapper.vm.updateListOfUserIds('assign', { id: 2, email: "admin@gmail.com" }, wrapper.vm.workspaces[0])
    expect(wrapper.vm.workspaces[0]).to.eql({ user_ids: [1, 2] })
  });

  it("should remove passed id from the list of project's user ids", () => {
    const wrapper = createWrapper(Workspaces, { methods }, fakeStoreData())
    wrapper.vm.workspaces = [{ user_ids: [1, 2] }]

    wrapper.vm.updateListOfUserIds('remove', 2, wrapper.vm.workspaces[0])
    expect(wrapper.vm.workspaces[0]).to.eql({ user_ids: [1] })
  })

  it("should add data about new user to users list", () => {
    const wrapper = createWrapper(Workspaces, { methods }, fakeStoreData())
    wrapper.vm.users = [{ email: "admin@gmail.com", id: 1 }]
    wrapper.vm.workspaces = [{ user_ids: [1] }]

    wrapper.vm.updateListOfUserIds('assign', { id: 2, email: "newuser@gmail.com" }, wrapper.vm.workspaces[0])
    expect(wrapper.vm.users[1]).to.eql({ id: 2, email: "newuser@gmail.com" })
  })

});
