import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/update_item'

const taskData = {
  id: 125,
  project: 1,
  description: "test",
  spentTime: '0.50'
}
const propsData = { activeDay: false, task: taskData }
const $appMethods = { isEmpty: (value) => { return true } }

it('should call mutation for clearing interval id', () => {
  const wrapper = createWrapper(task, { propsData, mocks: { $appMethods } }, fakeStoreData())
  const mutationStub = sinon.stub(wrapper.vm, "clearActiveTaskIntervalId")
  const updateStub = sinon.stub(wrapper.vm, "update")

  wrapper.vm.stop()
  expect(mutationStub.calledOnce).to.be.true

  updateStub.restore()
  mutationStub.restore()
});


it('should call update method', () => {
  const wrapper = createWrapper(task, { propsData, mocks: { $appMethods } }, fakeStoreData())
  const updateStub = sinon.stub(wrapper.vm, "update")

  wrapper.vm.stop()
  expect(updateStub.calledOnce).to.be.true
  updateStub.restore()
});
