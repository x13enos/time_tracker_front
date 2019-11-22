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

const data = {
  timeRecord: {
      id: 1,
      project: { id: 14 },
      description: "another text",
      spentTime: 2.5,
      timeStart: "day"
  }
}

test("it should add update task in the list", t => {
  mutations.updateTask(state, data)
  t.deepEqual(state.tasks, [
    {
      id: 1,
      project: 14,
      description: "another text",
      spentTime: 2.5,
      timeStart: "day"
    }
  ])
})
