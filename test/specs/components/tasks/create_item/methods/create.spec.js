import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/create_item'

describe('create', () => {

  it('should call action addTack', () => {
    const storeData = fakeStoreData();
    const wrapper = createWrapper(task, {}, storeData);
    const actionStub = sinon.stub(wrapper.vm, "addTask").returns({ success: () => { return true } });
    const paramsStub = sinon.stub(wrapper.vm, 'formData').returns({ description: "text" });

    wrapper.vm.create();
    expect(actionStub.calledOnce).to.be.true;
    expect(actionStub.args[0]).to.eql([
      { params: { description: "text" }, day: storeData.state.selectedDate }
    ]);

    sinon.restore();
  });

  it('should clean up form data if request was successful', async () => {
    const wrapper = createWrapper(task, {}, fakeStoreData());
    const methodStub = sinon.stub(wrapper.vm, 'cleanUpData');
    const actionStub = sinon.stub(wrapper.vm, "addTask").returns({ success: () => { return true } });

    await wrapper.vm.create();
    expect(methodStub.calledOnce).to.be.true;
    sinon.restore();
  });

  it('should decrease number of pending tasks if request was successful', async () => {
    const wrapper = createWrapper(task, {}, fakeStoreData());
    const actionStub = sinon.stub(wrapper.vm, "addTask").returns({ success: () => { return true } });
    const mutationStub = sinon.stub(wrapper.vm, "removePendingState");

    await wrapper.vm.create();
    expect(mutationStub.calledOnce).to.be.true;
    sinon.restore();
  });

  it('should show notification in case of success', async () => {
    const wrapper = createWrapper(task, {}, fakeStoreData());
    const actionStub = sinon.stub(wrapper.vm, "addTask").returns({ success: () => { return true } });
    const snackStub = sinon.stub(wrapper.vm, "updateSnack");

    await wrapper.vm.create();
    expect(snackStub.calledOnceWith({ message: wrapper.vm.$t('time_sheet.task_was_created'), color: "green"})).to.be.true;
    sinon.restore();
  });

  it('should show notification in case of fail', async () => {
    const wrapper = createWrapper(task, {}, fakeStoreData());
    const actionStub = sinon.stub(wrapper.vm, "addTask").rejects({ errors: "Big message of errors" });
    const snackStub = sinon.stub(wrapper.vm, "updateSnack");

    await wrapper.vm.create();
    expect(snackStub.calledOnceWith({ message: wrapper.vm.$t('time_sheet.task_was_not_created'), color: "red"})).to.be.true;
    sinon.restore();
  });

  it('should write errors to errorMessages attribute in case of fail', async () => {
    const wrapper = createWrapper(task, {}, fakeStoreData());
    const actionStub = sinon.stub(wrapper.vm, "addTask").rejects({ errors: "Big message of errors" });

    await wrapper.vm.create();
    expect(wrapper.vm.errorMessages).to.eql("Big message of errors");
    sinon.restore();
  });

});
