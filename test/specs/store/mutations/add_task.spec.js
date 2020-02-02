
import mutations from '@/store/mutations'

const state = {
  tasks: [{
    id: 1,
    project: 2,
    description: "text",
    spentTime: 1.5,
    timeStart: "time"
  }]
}

const data = {
  id: 5,
  project_id: 14,
  description: "another text",
  spent_time: 2.5,
  time_start: "day"
}

it('should add new task to the list', () => {
  mutations.addTask(state, data)
  expect(state.tasks).to.eql([
    {
      id: 1,
      project: 2,
      description: "text",
      spentTime: 1.5,
      timeStart: "time"
    },
    {
      id: 5,
      project: 14,
      description: "another text",
      spentTime: 2.5,
      timeStart: "day"
    }
  ])
})
