import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/create_item'

describe('addPendingState', () => {
  const propsData = { activeDay: false, task: { tagIds: [] }, dayIsBlocked: false }

  it('should call mutation "addPendingTaskId" if row class is  empty', () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    const mutationStub = sinon.stub(wrapper.vm, "addPendingTaskId")

    wrapper.vm.addPendingState()
    expect(mutationStub.calledOnce).to.be.true
    sinon.restore()
  });

});
