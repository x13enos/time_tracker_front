import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/create_item'
import { DateTime } from 'luxon'

const day = DateTime.local();

const propsData = { activeDay: false, day, dayIsBlocked: false }

describe('create', () => {

  it('should call action addTack', () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    const actionStub = sinon.stub(wrapper.vm, "addTask").returns({ success: () => { return true } })
    const paramsStub = sinon.stub(wrapper.vm, 'formData').returns({ description: "text" })

    wrapper.vm.create()
    expect(actionStub.calledOnce).to.be.true
    expect(actionStub.args[0]).to.eql([
      { params: { description: "text" }, day }
    ])

    actionStub.restore()
    paramsStub.restore()
  });

  it('should clean form data if request was successful', async () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    const actionStub = sinon.stub(wrapper.vm, "addTask").returns({ success: () => { return true } })
    wrapper.vm.description = "new text"

    await wrapper.vm.create()
    expect(wrapper.vm.description).to.eq(null)

    actionStub.restore()
  });

  it('should decrease number of pending tasks if request was successful', async () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    const actionStub = sinon.stub(wrapper.vm, "addTask").returns({ success: () => { return true } })
    const mutationStub = sinon.stub(wrapper.vm, "removePendingState")

    await wrapper.vm.create()
    expect(mutationStub.calledOnce).to.be.true

    actionStub.restore()
    mutationStub.restore()
  });

  it('should show notification in case of success', async () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    const actionStub = sinon.stub(wrapper.vm, "addTask").returns({ success: () => { return true } })
    const snackStub = sinon.stub(wrapper.vm, "updateSnack")

    await wrapper.vm.create()
    expect(snackStub.calledOnceWith({ message: wrapper.vm.$t('time_sheet.task_was_created'), color: "green"})).to.be.true

    actionStub.restore()
  });

  it('should show notification in case of fail', async () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    const actionStub = sinon.stub(wrapper.vm, "addTask").rejects({ errors: "Big message of errors" })
    const snackStub = sinon.stub(wrapper.vm, "updateSnack")

    await wrapper.vm.create()
    expect(snackStub.calledOnceWith({ message: wrapper.vm.$t('time_sheet.task_was_not_created'), color: "red"})).to.be.true

    actionStub.restore()
  });

  it('should write errors to errorMessages attribute in case of fail', async () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    const actionStub = sinon.stub(wrapper.vm, "addTask").rejects({ errors: "Big message of errors" })

    await wrapper.vm.create()
    expect(wrapper.vm.errorMessages).to.eql({ errors: "Big message of errors" })

    actionStub.restore()
  });

});
