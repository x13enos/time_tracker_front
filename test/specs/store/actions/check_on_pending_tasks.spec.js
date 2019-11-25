import test from 'ava';
import actions from '@/store/actions';

const storeObject = {
  commit: (type, payload) => {},
  getters: (type, payload) => {}
}

const callbackObject = {
  callback: () => {}
}

test("it should raise confirm if some pending tasks are there", t => {
  storeObject.getters.somePendingTasks = true

  const confirmStub = sinon.stub(global, "confirm")
  actions.checkOnPendingTasks(storeObject, callbackObject.callback)

  t.true(confirmStub.calledOnce)
  t.deepEqual(confirmStub.args[0], ['Changes that you made may not be saved.'])
  confirmStub.restore()
})

test("it should call mutation of cleaning counter pending tasks if confirm was successful", t => {
  storeObject.getters.somePendingTasks = true

  const confirmStub = sinon.stub(global, "confirm").returns(true)
  const commitStub = sinon.stub(storeObject, "commit")
  actions.checkOnPendingTasks(storeObject, callbackObject.callback)

  t.true(commitStub.calledOnce)
  t.deepEqual(commitStub.args[0], ["cleanCounterOfPendingTasks"])

  confirmStub.restore()
  commitStub.restore()
})

test("it should launch callback if confirm was successful", t => {
  storeObject.getters.somePendingTasks = true

  const confirmStub = sinon.stub(global, "confirm").returns(true)
  const callbackSpy = sinon.spy(callbackObject, "callback")
  actions.checkOnPendingTasks(storeObject, callbackObject.callback)

  t.true(callbackSpy.calledOnce)

  confirmStub.restore()
  callbackSpy.restore()
})

test("it should not call mutation of cleaning counter pending tasks if confirm was failed", t => {
  storeObject.getters.somePendingTasks = true

  const confirmStub = sinon.stub(global, "confirm").returns(false)
  const commitStub = sinon.stub(storeObject, "commit")
  actions.checkOnPendingTasks(storeObject, callbackObject.callback)

  t.false(commitStub.calledOnce)

  confirmStub.restore()
  commitStub.restore()
})

test("it should not launch callback if confirm was not successful", t => {
  storeObject.getters.somePendingTasks = true

  const confirmStub = sinon.stub(global, "confirm").returns(false)
  const callbackSpy = sinon.spy(callbackObject, "callback")
  actions.checkOnPendingTasks(storeObject, callbackObject.callback)

  t.false(callbackSpy.calledOnce)

  confirmStub.restore()
  callbackSpy.restore()
})

test("it should launch callback if pending tasks weren't found", t => {
  storeObject.getters.somePendingTasks = false

  const callbackSpy = sinon.spy(callbackObject, "callback")
  actions.checkOnPendingTasks(storeObject, callbackObject.callback)

  t.true(callbackSpy.calledOnce)

  callbackSpy.restore()
})
