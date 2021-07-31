import createWrapper from '@/test/support/create_wrapper.js'
import currentTask from '@/components/tasks/current'
import { expect } from 'chai';

describe('create', () => {
  it('should call action addTack', () => {
    const wrapper = createWrapper(currentTask, {}, fakeStoreData())
    const actionStub = sinon.stub(wrapper.vm, "addTask").returns({ success: () => { return true } })
    const paramsStub = sinon.stub(wrapper.vm, 'formData').returns({ description: "text" })

    wrapper.vm.create()
    expect(paramsStub.calledOnceWith(false)).to.be.true;
    expect(actionStub.calledOnceWith({ params: { description: "text" }, day: wrapper.vm.selectedDate })).to.be.true
    sinon.restore()
  });

  it('should call method for cleaning up the current time record line', async () => {
    const wrapper = createWrapper(currentTask, {}, fakeStoreData())
    sinon.stub(wrapper.vm, "addTask").returns({ success: () => { return true } })
    sinon.stub(wrapper.vm, 'formData').returns({ description: "text" })
    const methodStub = sinon.stub(wrapper.vm, 'cleanUpData');
    await wrapper.vm.create()

    expect(methodStub.calledOnce).to.be.true;
    sinon.restore()
  });
})
