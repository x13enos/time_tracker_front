import actions from '@/store/actions';

const commitObject = { commit: (type, payload) => {} }

describe("stopOtherTasks", () => {
  it('should call mutation clearActiveTaskIntervalId if time start for passed data is existed', async () => {
    const commitStub = sinon.stub(commitObject, 'commit')
    const $appMethods = { isEmpty: () => false }
    actions.$appMethods = $appMethods
    actions.stopOtherTasks(commitObject, {} )
    expect(commitStub.args[0]).to.eql([ 'clearActiveTaskIntervalId' ])
    commitStub.restore()
  })

  it('should call mutation cleanTasksStartTime if time start for passed data is existed', async () => {
    const commitStub = sinon.stub(commitObject, 'commit')
    const $appMethods = { isEmpty: () => false }
    actions.$appMethods = $appMethods
    actions.stopOtherTasks(commitObject, {} )
    expect(commitStub.args[1]).to.eql([ 'cleanTasksStartTime' ])
    commitStub.restore()
  })

  it('should not call mutation cleanTasksStartTime if time start for passed data is not existed', async () => {
    const commitStub = sinon.stub(commitObject, 'commit')
    const $appMethods = { isEmpty: () => true }
    actions.$appMethods = $appMethods
    actions.stopOtherTasks(commitObject, {} )
    expect(commitStub.called).to.be.false
    commitStub.restore()
  })
})
