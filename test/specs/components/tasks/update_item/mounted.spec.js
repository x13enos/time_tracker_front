import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/update_item'

let wrapper, updatingSpentTimeStub, startTaskStub;

const taskData = {
  id: 125,
  project: 1,
  description: "test",
  spentTime: 0.5,
  timeStart: 28218231828
}
const propsData = { activeDay: false, task: taskData }
const $appMethods = { isEmpty: (value) => { return false } }
const newData = {
  description: "new text"
}
const methods = { start: () => {} }

it('should call method for starting task', () => {
  startTaskStub = sinon.stub(methods, "start")
  const wrapper = createWrapper(task, { propsData, mocks: { $appMethods }, methods }, fakeStoreData())

  expect(startTaskStub.calledOnce).to.be.true

  startTaskStub.restore()
});
