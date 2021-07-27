import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/create_item'

describe('selectPendingClass', () => {

  it('should call method for removing pending state in case of deleting info', () => {
    const wrapper = createWrapper(task, {}, fakeStoreData())
    sinon.stub(wrapper.vm, "containsEmptyData").returns(true)
    const methodStub = sinon.stub(wrapper.vm, "removePendingState")

    wrapper.vm.selectPendingClass()

    expect(methodStub.calledOnce).to.be.true
    sinon.restore()
  });

  it('should call method for adding pending state', () => {
    const wrapper = createWrapper(task, {}, fakeStoreData())
    sinon.stub(wrapper.vm, "containsEmptyData").returns(false)
    const methodStub = sinon.stub(wrapper.vm, "addPendingState")

    wrapper.vm.selectPendingClass()

    expect(methodStub.calledOnce).to.be.true
    sinon.restore()
  });

});
