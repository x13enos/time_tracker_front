import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/update_item'

describe('removePendingState', () => {
  const propsData = { activeDay: false, task: {} }

  it('should call mutation "deletePendingTaskId"', () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    const mutationStub = sinon.stub(wrapper.vm, "deletePendingTaskId")

    wrapper.vm.removePendingState()
    expect(mutationStub.calledOnce).to.be.true
    sinon.restore()
  });

  it('should clean up row class', () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    wrapper.vm.rowClass = "red"

    wrapper.vm.removePendingState()
    expect(wrapper.vm.rowClass).to.be.empty
  });

});
