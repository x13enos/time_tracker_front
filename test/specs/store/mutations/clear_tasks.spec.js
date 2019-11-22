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

test("it should clear list of tasks", t => {
  mutations.clearTasks(state)
  t.deepEqual(state.tasks, [])
})
