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

test("it should clear time start for task", t => {
  mutations.cleanTasksStartTime(state)
  t.is(state.tasks[0].timeStart, null)
})
