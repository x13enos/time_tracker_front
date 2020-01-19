import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/create_item'
import { DateTime } from 'luxon'

const day = DateTime.local();

const propsData = { activeDay: false, day }
const $appMethods = { isEmpty: () => {} }

it('should call action addTack', () => {
  const wrapper = createWrapper(task, { propsData, mocks: { $appMethods } }, fakeStoreData())
  const actionStub = sinon.stub(wrapper.vm, "addTask").returns({ success: () => { return true } })
  const paramsStub = sinon.stub(wrapper.vm, 'formData').returns({ description: "text" })

  wrapper.vm.create()
  expect(actionStub.calledOnce).to.be.true
  expect(actionStub.args[0]).to.eql([
    { params: { description: "text" }, day }
  ])

  actionStub.restore()
  paramsStub.restore()
});

it('should clean form data if request was successful', async () => {
  const wrapper = createWrapper(task, { propsData, mocks: { $appMethods } }, fakeStoreData())
  const actionStub = sinon.stub(wrapper.vm, "addTask").returns({ success: () => { return true } })
  wrapper.vm.description = "new text"

  await wrapper.vm.create()
  expect(wrapper.vm.description).to.eq(null)

  actionStub.restore()
});

it('should decrease number of pending tasks if request was successful', async () => {
  const wrapper = createWrapper(task, { propsData, mocks: { $appMethods } }, fakeStoreData())
  const actionStub = sinon.stub(wrapper.vm, "addTask").returns({ success: () => { return true } })
  const mutationStub = sinon.stub(wrapper.vm, "updateCounterOfPendingTasks")

  await wrapper.vm.create()
  expect(mutationStub.calledOnce).to.be.true
  expect(mutationStub.args[0]).to.eql([-1])

  actionStub.restore()
  mutationStub.restore()
});

it('should update snack data with passed errors', async () => {
  const wrapper = createWrapper(task, { propsData, mocks: { $appMethods } }, fakeStoreData())
  const actionStub = sinon.stub(wrapper.vm, "addTask").returns({
    success: () => { return false },
    errors: "Big message of errors"
  })
  const mutationStub = sinon.stub(wrapper.vm, "updateSnack")

  await wrapper.vm.create()
  expect(mutationStub.calledOnce).to.be.true
  expect(mutationStub.args[0]).to.eql([{
    message: "Big message of errors",
    color: "red"
  }])

  actionStub.restore()
  mutationStub.restore()
});

it('should update row color class', async () => {
  const wrapper = createWrapper(task, { propsData, mocks: { $appMethods } }, fakeStoreData())
  const actionStub = sinon.stub(wrapper.vm, "addTask").returns({ success: () => { return false } })

  await wrapper.vm.create()
  expect(wrapper.vm.rowClass).to.eq('red')

  actionStub.restore()
});
