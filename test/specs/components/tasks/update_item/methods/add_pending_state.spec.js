import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/update_item'

describe('addPendingState', () => {
  const propsData = { activeDay: false, task: { tagIds: [] }, dayIsBlocked: false }

  it('should call mutation "addPendingTaskId" if row class is  empty', () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    const mutationStub = sinon.stub(wrapper.vm, "addPendingTaskId")

    wrapper.vm.addPendingState()
    expect(mutationStub.calledOnce).to.be.true
    sinon.restore()
  });

  it('should change row class if it is empty', () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    wrapper.vm.rowClass = ""

    wrapper.vm.addPendingState()
    expect(wrapper.vm.rowClass).to.eq("yellow lighten-3")
  });

});
