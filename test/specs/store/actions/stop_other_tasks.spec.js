import actions from '@/store/actions';

const commitObject = { commit: (type, payload) => {} }

describe("stopOtherTasks", () => {
  it('should call mutation clearActiveTaskIntervalId', async () => {
    const commitStub = sinon.stub(commitObject, 'commit')
    actions.stopOtherTasks(commitObject)
    expect(commitStub.args[0]).to.eql([ 'clearActiveTaskIntervalId' ])
    commitStub.restore()
  })

  it('should call mutation cleanTasksStartTime', async () => {
    const commitStub = sinon.stub(commitObject, 'commit')
    actions.stopOtherTasks(commitObject)
    expect(commitStub.args[1]).to.eql([ 'cleanTasksStartTime' ])
    commitStub.restore()
  })
})
