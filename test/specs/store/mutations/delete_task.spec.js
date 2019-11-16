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

test("it should delete task from list", t => {
  mutations.deleteTask(state, 1)
  t.deepEqual(state.tasks, [])
})
