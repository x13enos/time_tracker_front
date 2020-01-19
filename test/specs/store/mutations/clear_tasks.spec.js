
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

it('should clear list of tasks', () => {
  mutations.clearTasks(state)
  expect(state.tasks).to.eql([])
})
