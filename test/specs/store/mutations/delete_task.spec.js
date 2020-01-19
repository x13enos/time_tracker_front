
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

it('should delete task from list', () => {
  mutations.deleteTask(state, 1)
  expect(state.tasks).to.eql([])
})
