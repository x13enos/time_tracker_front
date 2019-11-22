import test from 'ava';
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

test("it should update list of tasks", t => {
  mutations.updateTasks(state, data)
  t.deepEqual(state.tasks, [{
    id: 1,
    project: 2,
    description: "text",
    spentTime: 1.5,
    timeStart: "time"
  }])
})
