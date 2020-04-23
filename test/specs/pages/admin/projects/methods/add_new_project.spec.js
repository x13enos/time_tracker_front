import createWrapper from '@/test/support/create_wrapper.js'
import Projects from '@/pages/admin/projects'

describe('addNewProject', () => {

  const methods = {
    fetchProjects: () => {},
    fetchUsers: () => {}
  }

  const projectData = { name: "test-project" }

  it("should add passed data to the list of projects", () => {
    const wrapper = createWrapper(Projects, { methods }, fakeStoreData())

    wrapper.vm.addNewProject(projectData)
    expect(wrapper.vm.projects[0]).to.eql(projectData)
  });

});
