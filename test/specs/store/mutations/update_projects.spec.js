
import mutations from '@/store/mutations'

const state = {
  projects: []
}

const projects = [1,2,3]

it('should update list of projects', () => {
  mutations.updateProjects(state, projects)
  expect(state.projects).to.eql([1,2,3])
})
