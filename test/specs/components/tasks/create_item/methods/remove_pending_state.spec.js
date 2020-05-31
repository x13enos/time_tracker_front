import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/create_item'
import { DateTime } from 'luxon'

describe('removePendingState', () => {
  const propsData = { activeDay: true, day: DateTime.local(), dayIsBlocked: false }

  it('call mutation for deleting pending taks id', () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    const mutationStub = sinon.stub(wrapper.vm, "deletePendingTaskId")

    wrapper.vm.removePendingState()
    expect(mutationStub.calledOnce).to.be.true
    sinon.restore()
  });

  it('clear up the row class', () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    const mutationStub = sinon.stub(wrapper.vm, "deletePendingTaskId")
    wrapper.vm.rowClass = "error"

    wrapper.vm.removePendingState()
    expect(wrapper.vm.rowClass).to.be.empty
    sinon.restore()
  });
});
