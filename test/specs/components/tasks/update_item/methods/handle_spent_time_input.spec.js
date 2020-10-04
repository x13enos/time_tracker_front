import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/update_item'

describe('handleSpentTimeInput', () => {
  const propsData = { activeDay: false, task: { tagIds: [] }, dayIsBlocked: false }

  it('should call method "selectPendingClass"', () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    const mutationStub = sinon.stub(wrapper.vm, "selectPendingClass")

    wrapper.vm.handleSpentTimeInput()
    expect(mutationStub.calledOnce).to.be.true
    sinon.restore()
  });

  it('should remove errors from errorMessages', () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    const mutationStub = sinon.stub(wrapper.vm, "selectPendingClass")
    wrapper.vm.errorMessages = { "spent_time": ["error"] }

    wrapper.vm.handleSpentTimeInput()
    expect(wrapper.vm.errorMessages["spent_time"]).to.be.undefined
    sinon.restore()
  });

});
