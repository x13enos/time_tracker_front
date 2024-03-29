import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/update_item'

describe('update', () => {

  const propsData = { task: { tagIds: [] }, activeDay: false, dayIsBlocked: false }

  it('should not call action updateNonActiveTask if validation was failed', () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    const actionStub = sinon.stub(wrapper.vm, 'updateNonActiveTask').returns({ success: () => { return true } })
    wrapper.vm.valid = false

    wrapper.vm.update(true)
    expect(actionStub.called).to.be.false

    actionStub.restore()
  });

  it('should call action updateNonActiveTask and form data should have active status as true', () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    const paramsStub = sinon.stub(wrapper.vm, 'formData').returns({ description: "text" })
    const actionStub = sinon.stub(wrapper.vm, 'updateNonActiveTask').returns({ success: () => { return true } })

    wrapper.vm.update(true)
    expect(actionStub.calledOnce).to.be.true
    expect(actionStub.args[0]).to.eql([{
      description: "text",
      active: true
    }])

    sinon.restore()
  });

  it('should call action updateNonActiveTask and form data should have active status as false', () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    const paramsStub = sinon.stub(wrapper.vm, 'formData').returns({ description: "text" })
    const actionStub = sinon.stub(wrapper.vm, 'updateNonActiveTask').returns({ success: () => { return true } })

    wrapper.vm.update(false)
    expect(actionStub.calledOnce).to.be.true
    expect(actionStub.args[0]).to.eql([{
      description: "text",
      active: false
    }])

    sinon.restore()
  });

  it('should call action updateNonActiveTask and form data should not have "active" value', () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    const paramsStub = sinon.stub(wrapper.vm, 'formData').returns({ description: "text" })
    const actionStub = sinon.stub(wrapper.vm, 'updateNonActiveTask').returns({ success: () => { return true } })

    wrapper.vm.update()
    expect(actionStub.calledOnce).to.be.true
    expect(actionStub.args[0]).to.eql([{
      description: "text"
    }])

    sinon.restore()
  });

  it('should remove pending state if request was successful', async () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    const actionStub = sinon.stub(wrapper.vm, 'updateNonActiveTask').returns({ success: () => { return true } })
    const mutationStub = sinon.stub(wrapper.vm, "removePendingState")

    await wrapper.vm.update(true)
    expect(mutationStub.calledOnce).to.be.true

    actionStub.restore()
    mutationStub.restore()
  });

  it('should update notification in case of success', async () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    const actionStub = sinon.stub(wrapper.vm, 'updateNonActiveTask')
    const snackStub = sinon.stub(wrapper.vm, 'updateSnack')

    await wrapper.vm.update()
    expect(snackStub.calledOnceWith({ message: wrapper.vm.$t("time_sheet.task_was_updated"), color: "green" })).to.be.true

    actionStub.restore()
  });

  it('should not update notification in case of launching timer', async () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    const actionStub = sinon.stub(wrapper.vm, 'updateNonActiveTask')
    const snackStub = sinon.stub(wrapper.vm, 'updateSnack')

    await wrapper.vm.update(true)
    expect(snackStub.called).to.be.false

    actionStub.restore()
  });

  it('should update attribute errorMessages with rejected data', async () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    const actionStub = sinon.stub(wrapper.vm, 'updateNonActiveTask').rejects({ errors: "Big message of errors" })

    await wrapper.vm.update(true)
    expect(wrapper.vm.errorMessages).to.eql("Big message of errors")

    actionStub.restore()
  });

  it('should update notification in case of fail', async () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    const actionStub = sinon.stub(wrapper.vm, 'updateNonActiveTask').rejects({ errors: "Big message of errors" })
    const snackStub = sinon.stub(wrapper.vm, 'updateSnack')

    await wrapper.vm.update(true)
    expect(snackStub.calledOnceWith({ message: wrapper.vm.$t("time_sheet.task_was_not_updated"), color: "red" })).to.be.true

    actionStub.restore()
  });

});
