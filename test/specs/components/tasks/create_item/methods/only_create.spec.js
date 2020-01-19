import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/create_item'
import { DateTime } from 'luxon'

const propsData = {
  day: DateTime.local(),
  activeDay: false
}

const $appMethods = { isEmpty: () => {} }

it('should not call create method if start button was focused', async () => {
  const wrapper = createWrapper(task, { propsData, mocks: { $appMethods } }, fakeStoreData())
  const methodStub = sinon.stub(wrapper.vm, "create")
  wrapper.vm.btnStartFocused = true
  await wrapper.vm.onlyCreate()
  expect(methodStub.called).to.be.false

  methodStub.restore()
});

it('should call create method if start button was not focused', async () => {
  const wrapper = createWrapper(task, { propsData, mocks: { $appMethods } }, fakeStoreData())
  const methodStub = sinon.stub(wrapper.vm, "create")
  wrapper.vm.btnStartFocused = false
  await wrapper.vm.onlyCreate()
  expect(methodStub.calledOnce).to.be.true

  methodStub.restore()
});
