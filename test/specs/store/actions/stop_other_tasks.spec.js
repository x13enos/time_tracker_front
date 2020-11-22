import actions from '@/store/actions';

const commitObject = { commit: (type, payload) => {} }

describe("stopOtherTasks", () => {
  it('should call mutation clearActiveTaskIntervalId if time start for passed data is existed', async () => {
    const commitStub = sinon.stub(commitObject, 'commit')
    actions.stopOtherTasks(commitObject, true )
    expect(commitStub.args[0]).to.eql([ 'clearActiveTaskIntervalId' ])
    commitStub.restore()
  })

  it('should call mutation cleanTasksStartTime if time start for passed data is existed', async () => {
    const commitStub = sinon.stub(commitObject, 'commit')
    actions.stopOtherTasks(commitObject, true )
    expect(commitStub.args[1]).to.eql([ 'cleanTasksStartTime' ])
    commitStub.restore()
  })

  it('should not call mutation cleanTasksStartTime if time start for passed data is not existed', async () => {
    const commitStub = sinon.stub(commitObject, 'commit')
    actions.stopOtherTasks(commitObject, false )
    expect(commitStub.called).to.be.false
    commitStub.restore()
  })
})
