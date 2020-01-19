
import actions from '@/store/actions';

const commitObject = { commit: (type, payload) => {} }
const $appMethods = { isEmpty: () => {} }

it('should call mutation clearActiveTaskIntervalId if time start for passed data is existed', async () => {
  const commitStub = sinon.stub(commitObject, 'commit')
  actions.$appMethods = $appMethods
  actions.stopOtherTasks(commitObject, { timeRecord: { timeStart: 'now' } })
  expect(commitStub.args[0]).to.eql([ 'clearActiveTaskIntervalId' ])
  commitStub.restore()
})

it('should call mutation cleanTasksStartTime if time start for passed data is existed', async () => {
  const commitStub = sinon.stub(commitObject, 'commit')
  actions.$appMethods = $appMethods
  actions.stopOtherTasks(commitObject, { timeRecord: { timeStart: 'now' } })
  expect(commitStub.args[1]).to.eql([ 'cleanTasksStartTime' ])
  commitStub.restore()
})
