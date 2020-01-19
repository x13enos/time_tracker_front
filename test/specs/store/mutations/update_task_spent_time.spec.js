
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

it("should update tasks's spent time", () => {
  mutations.updateTaskSpentTime(state, { spentTime: 2.5, id: 1})
  expect(state.tasks).to.eql([
    {
      id: 1,
      project: 2,
      description: "text",
      spentTime: 2.5,
      timeStart: "time"
    }
  ])
})
