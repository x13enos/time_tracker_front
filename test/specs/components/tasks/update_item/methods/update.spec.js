import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/update_item'

const propsData = { task: {}, activeDay: false }
const $appMethods = { isEmpty: () => {} }

it('should not call action updateTask if validation was failed', () => {
  const wrapper = createWrapper(task, { propsData, mocks: { $appMethods } }, fakeStoreData())
  const actionStub = sinon.stub(wrapper.vm, 'updateTask').returns({ success: () => { return true } })
  wrapper.vm.valid = false

  wrapper.vm.update(true)
  expect(actionStub.called).to.be.false

  actionStub.restore()
});

it('should call action updateTask and form data should have active status as true', () => {
  const wrapper = createWrapper(task, { propsData, mocks: { $appMethods } }, fakeStoreData())
  const paramsStub = sinon.stub(wrapper.vm, 'formData').returns({ description: "text" })
  const actionStub = sinon.stub(wrapper.vm, 'updateTask').returns({ success: () => { return true } })

  wrapper.vm.update(true)
  expect(actionStub.calledOnce).to.be.true
  expect(actionStub.args[0]).to.eql([{
    description: "text",
    active: true
  }])

  actionStub.restore()
  paramsStub.restore()
});

it('should remove pending row class if request was successful', async () => {
  const wrapper = createWrapper(task, { propsData, mocks: { $appMethods } }, fakeStoreData())
  const actionStub = sinon.stub(wrapper.vm, 'updateTask').returns({ success: () => { return true } })

  await wrapper.vm.update(true)
  expect(wrapper.vm.rowClass).to.eq("")
  actionStub.restore()
});

it('should decrease number of pending tasks if request was successful', async () => {
  const wrapper = createWrapper(task, { propsData, mocks: { $appMethods } }, fakeStoreData())
  const actionStub = sinon.stub(wrapper.vm, 'updateTask').returns({ success: () => { return true } })
  const mutationStub = sinon.stub(wrapper.vm, "updateCounterOfPendingTasks")

  await wrapper.vm.update(true)
  expect(mutationStub.calledOnce).to.be.true
  expect(mutationStub.args[0]).to.eql([-1])

  actionStub.restore()
  mutationStub.restore()
});

it('should update snack data with passed errors', async () => {
  const wrapper = createWrapper(task, { propsData, mocks: { $appMethods } }, fakeStoreData())
  const actionStub = sinon.stub(wrapper.vm, "updateTask").returns({
    success: () => { return false },
    errors: "Big message of errors"
  })
  const mutationStub = sinon.stub(wrapper.vm, "updateSnack")

  await wrapper.vm.update()
  expect(mutationStub.calledOnce).to.be.true
  expect(mutationStub.args[0]).to.eql([{
    message: "Big message of errors",
    color: "red"
  }])

  actionStub.restore()
  mutationStub.restore()
});

it('should change pending row class to red if request was failed', async () => {
  const wrapper = createWrapper(task, { propsData, mocks: { $appMethods } }, fakeStoreData())
  const actionStub = sinon.stub(wrapper.vm, 'updateTask').returns({ success: () => { return false } })

  await wrapper.vm.update(true)
  expect(wrapper.vm.rowClass).to.eq("red")

  actionStub.restore()
});
