import createWrapper from '@/test/support/create_wrapper.js'
import Projects from '@/pages/admin/projects'

describe('updateProjectData', () => {

  const mocks = {
    $api: {
      allProjects: () => ({}),
      getUsersByCurrentWorkspace: () => ({})
    }
  }

  const projectData = { name: "new-test-project", id: 1  }

  it("should replace project data in the list of projects", async () => {
    const wrapper = createWrapper(Projects, { mocks }, fakeStoreData())
    wrapper.vm.projects = [{ id: 1, name: 'test-project' }]

    await wrapper.vm.updateProjectData(1, projectData)
    expect(wrapper.vm.projects[0]).to.eql({ id: 1, name: "new-test-project" })

  });

});
