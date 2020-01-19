
import actions from '@/store/actions';

const storeObject = {
  commit: (type, payload) => {},
  getters: (type, payload) => {}
}

const callbackObject = {
  callback: () => {}
}

it('should raise confirm if some pending tasks are there', () => {
  storeObject.getters.somePendingTasks = true

  const confirmStub = sinon.stub(global, "confirm")
  actions.checkOnPendingTasks(storeObject, callbackObject.callback)

  expect(confirmStub.calledOnce).to.be.true
  expect(confirmStub.args[0]).to.eql(['Changes that you made may not be saved.'])
  confirmStub.restore()
})

it('should call mutation of cleaning counter pending tasks if confirm was successful', () => {
  storeObject.getters.somePendingTasks = true

  const confirmStub = sinon.stub(global, "confirm").returns(true)
  const commitStub = sinon.stub(storeObject, "commit")
  actions.checkOnPendingTasks(storeObject, callbackObject.callback)

  expect(commitStub.calledOnce).to.be.true
  expect(commitStub.args[0]).to.eql(["cleanCounterOfPendingTasks"])

  confirmStub.restore()
  commitStub.restore()
})

it('should launch callback if confirm was successful', () => {
  storeObject.getters.somePendingTasks = true

  const confirmStub = sinon.stub(global, "confirm").returns(true)
  const callbackSpy = sinon.spy(callbackObject, "callback")
  actions.checkOnPendingTasks(storeObject, callbackObject.callback)

  expect(callbackSpy.calledOnce).to.be.true

  confirmStub.restore()
  callbackSpy.restore()
})

it('should not call mutation of cleaning counter pending tasks if confirm was failed', () => {
  storeObject.getters.somePendingTasks = true

  const confirmStub = sinon.stub(global, "confirm").returns(false)
  const commitStub = sinon.stub(storeObject, "commit")
  actions.checkOnPendingTasks(storeObject, callbackObject.callback)

  expect(commitStub.calledOnce).to.be.false

  confirmStub.restore()
  commitStub.restore()
})

it('should not launch callback if confirm was not successful', () => {
  storeObject.getters.somePendingTasks = true

  const confirmStub = sinon.stub(global, "confirm").returns(false)
  const callbackSpy = sinon.spy(callbackObject, "callback")
  actions.checkOnPendingTasks(storeObject, callbackObject.callback)

  expect(callbackSpy.calledOnce).to.be.false

  confirmStub.restore()
  callbackSpy.restore()
})

it("should launch callback if pending tasks weren't found", () => {
  storeObject.getters.somePendingTasks = false

  const callbackSpy = sinon.spy(callbackObject, "callback")
  actions.checkOnPendingTasks(storeObject, callbackObject.callback)

  expect(callbackSpy.calledOnce).to.be.true

  callbackSpy.restore()
})
