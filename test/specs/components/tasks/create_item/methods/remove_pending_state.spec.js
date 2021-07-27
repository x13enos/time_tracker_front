import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/create_item'

describe('removePendingState', () => {

  it('call mutation for deleting pending taks id', () => {
    const wrapper = createWrapper(task, {}, fakeStoreData())
    const mutationStub = sinon.stub(wrapper.vm, "deletePendingTaskId")

    wrapper.vm.removePendingState()
    expect(mutationStub.calledOnce).to.be.true
    sinon.restore()
  });
});
