
import mutations from '@/store/mutations'

const state = {
  tasks: []
}

const data = [{
  id: 1,
  project: { id: 2 },
  description: "text",
  spentTime: 1.5,
  timeStart: "time"
}]

it('should update list of tasks', () => {
  mutations.updateTasks(state, data)
  expect(state.tasks).to.eql([{
    id: 1,
    project: 2,
    description: "text",
    spentTime: 1.5,
    timeStart: "time"
  }])
})
