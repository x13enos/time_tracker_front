import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/create_item'
import { DateTime } from 'luxon'

const propsData = {
  day: DateTime.local(),
  activeDay: false
}
const $appMethods = { isEmpty: () => {} }

it('should set the right pending row class if that was empty', () => {
  const $appMethods = { isEmpty: () => true }
  const wrapper = createWrapper(task, { propsData, mocks: { $appMethods } }, fakeStoreData())

  wrapper.vm.selectPendingClass()
  expect(wrapper.vm.rowClass).to.eq("yellow lighten-3")
});

it('should call mutation for increasing number of pending tasks', () => {
  const $appMethods = { isEmpty: () => true }
  const wrapper = createWrapper(task, { propsData, mocks: { $appMethods } }, fakeStoreData())
  const mutationStub = sinon.stub(wrapper.vm, "updateCounterOfPendingTasks")

  wrapper.vm.selectPendingClass()
  expect(mutationStub.calledOnce).to.be.true
  expect(mutationStub.args[0]).to.eql([1])

  mutationStub.restore()
});

it('should not set the right pending row class if this exists', () => {
  const $appMethods = { isEmpty: () => false }
  const wrapper = createWrapper(task, { propsData, mocks: { $appMethods } }, fakeStoreData())
  wrapper.vm.rowClass = "red"

  wrapper.vm.selectPendingClass()
  expect(wrapper.vm.rowClass).to.eq("red")
});
