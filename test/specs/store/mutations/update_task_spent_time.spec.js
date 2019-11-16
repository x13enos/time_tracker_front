import test from 'ava';
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

test("it should update tasks's spent time", t => {
  mutations.updateTaskSpentTime(state, { spentTime: 2.5, id: 1})
  t.deepEqual(state.tasks, [
    {
      id: 1,
      project: 2,
      description: "text",
      spentTime: 2.5,
      timeStart: "time"
    }
  ])
})
