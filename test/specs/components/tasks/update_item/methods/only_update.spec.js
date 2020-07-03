import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/update_item'

describe('onlyUpdate', () => {

  const propsData = { task: { tagIds: [] }, activeDay: false, dayIsBlocked: false }

  it('should not call action update if start button is focused', () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    const updateStub = sinon.stub(wrapper.vm, 'update')
    wrapper.vm.btnStartFocused = true

    wrapper.vm.onlyUpdate()
    expect(updateStub.called).to.be.false

    sinon.restore()
  });

  it('should not call action update if task data is invalid', () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    const updateStub = sinon.stub(wrapper.vm, 'update')
    wrapper.vm.btnStartFocused = false
    wrapper.vm.valid = false

    wrapper.vm.onlyUpdate()
    expect(updateStub.called).to.be.false

    sinon.restore()
  });

  it('should not call action update if task has the same attributes', () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    sinon.stub(wrapper.vm, "taskHasTheSameAttributes").returns(true)
    const updateStub = sinon.stub(wrapper.vm, 'update')
    wrapper.vm.btnStartFocused = false
    wrapper.vm.valid = true

    wrapper.vm.onlyUpdate()
    expect(updateStub.called).to.be.false

    sinon.restore()
  });

  it('should call action update', () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    sinon.stub(wrapper.vm, "taskHasTheSameAttributes").returns(false)
    const updateStub = sinon.stub(wrapper.vm, 'update')
    wrapper.vm.btnStartFocused = false
    wrapper.vm.valid = true

    wrapper.vm.onlyUpdate()
    expect(updateStub.called).to.be.true

    sinon.restore()
  });

})
