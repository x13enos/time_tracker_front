import {serial as test} from 'ava';
import actions from '@/store/actions';

const commitObject = { commit: (type, payload) => {} }
const $appMethods = { isEmpty: () => {} }

test("it should call mutation clearActiveTaskIntervalId if time start for passed data is existed", async t => {
  const commitStub = sinon.stub(commitObject, 'commit')
  actions.$appMethods = $appMethods
  actions.stopOtherTasks(commitObject, { timeRecord: { timeStart: 'now' } })
  t.deepEqual(commitStub.args[0], [ 'clearActiveTaskIntervalId' ])
  commitStub.restore()
})

test("it should call mutation cleanTasksStartTime if time start for passed data is existed", async t => {
  const commitStub = sinon.stub(commitObject, 'commit')
  actions.$appMethods = $appMethods
  actions.stopOtherTasks(commitObject, { timeRecord: { timeStart: 'now' } })
  t.deepEqual(commitStub.args[1], [ 'cleanTasksStartTime' ])
  commitStub.restore()
})
