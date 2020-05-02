import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/update_item'

const propsData = { activeDay: false, task: {} }

describe('selectPendingClass', () => {

  it('should call method "removePendingState" if task has the same attributes', () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    sinon.stub(wrapper.vm, "taskHasTheSameAttributes").returns(true)
    const methodStub = sinon.stub(wrapper.vm, "removePendingState")

    wrapper.vm.selectPendingClass()
    expect(methodStub.calledOnce).to.be.true
    sinon.restore()
  });

  it('should call method "addPendingState" if task does not have the same attributes', () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    sinon.stub(wrapper.vm, "taskHasTheSameAttributes").returns(false)
    const methodStub = sinon.stub(wrapper.vm, "addPendingState")

    wrapper.vm.selectPendingClass()
    expect(methodStub.calledOnce).to.be.true
    sinon.restore()
  });

});
