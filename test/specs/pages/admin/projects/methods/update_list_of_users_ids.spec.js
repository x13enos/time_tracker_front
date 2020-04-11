import createWrapper from '@/test/support/create_wrapper.js'
import Projects from '@/pages/admin/projects'

describe('updateListOfUserIds', () => {
  const methods = {
    fetchProjects: () => {},
    fetchUsers: () => {}
  }

  it("should add passed id to the project user ids list", () => {
    const wrapper = createWrapper(Projects, { methods }, fakeStoreData())
    wrapper.vm.projects = [{ user_ids: [1] }]

    wrapper.vm.updateListOfUserIds('assign', 2, wrapper.vm.projects[0])
    expect(wrapper.vm.projects[0]).to.eql({ user_ids: [1, 2] })
  });

  it("should remove passed id from the list of project's user ids", () => {
    const wrapper = createWrapper(Projects, { methods }, fakeStoreData())
    wrapper.vm.projects = [{ user_ids: [1, 2] }]

    wrapper.vm.updateListOfUserIds('remove', 2, wrapper.vm.projects[0])
    expect(wrapper.vm.projects[0]).to.eql({ user_ids: [1] })
  })

});
