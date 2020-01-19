
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

it('should clear time start for task', () => {
  mutations.cleanTasksStartTime(state)
  expect(state.tasks[0].timeStart).to.eq(null)
})
