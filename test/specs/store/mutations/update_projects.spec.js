import test from 'ava';
import mutations from '@/store/mutations'

const state = {
  projects: []
}

const projects = [1,2,3]

test("it should update list of projects", t => {
  mutations.updateProjects(state, projects)
  t.deepEqual(state.projects, [1,2,3])
})
