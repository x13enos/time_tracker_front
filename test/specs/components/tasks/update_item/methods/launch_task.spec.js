import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/update_item'

describe('launchTask', () => {

  const propsData = { task: { tagIds: [] }, activeDay: true, dayIsBlocked: false }

  it('should set loading attribute as true', () => {
    const storeData = fakeStoreData();
    storeData.state.activeTaskIntervalId = 1;
    const wrapper = createWrapper(task, { propsData }, storeData)
    wrapper.vm.loading = false
    sinon.stub(wrapper.vm, 'update')

    wrapper.vm.launchTask()
    expect(wrapper.vm.loading).to.be.true
    sinon.restore()
  });

  it('should set loading attribute as false after the updating of task', () => {
    const storeData = fakeStoreData();
    storeData.state.activeTaskIntervalId = 1;
    const wrapper = createWrapper(task, { propsData }, storeData)
    wrapper.vm.loading = true
    sinon.stub(wrapper.vm, 'update')

    wrapper.vm.launchTask()
    setTimeout(async () => {
      expect(wrapper.vm.loading).to.be.false
      sinon.restore()
    }, 600)
  });

  it('should call update method with the delay in case of other task is active now', () => {
    const storeData = fakeStoreData();
    storeData.state.activeTaskIntervalId = 1;
    const wrapper = createWrapper(task, { propsData }, storeData)
    const methodStub = sinon.stub(wrapper.vm, 'update')

    wrapper.vm.launchTask()
    setTimeout(async () => {
      expect(methodStub.calledOnceWith(true)).to.be.true
      sinon.restore()
    }, 600)
  });

  it('should not call update method immidiately in case of other task is active now', () => {
    const storeData = fakeStoreData();
    storeData.state.activeTaskIntervalId = 1;
    const wrapper = createWrapper(task, { propsData }, storeData)
    const methodStub = sinon.stub(wrapper.vm, 'update')

    wrapper.vm.launchTask()
    expect(methodStub.called).to.be.false
    sinon.restore()
  });

  it('should call update method immediately if no any other active task there', () => {
    const storeData = fakeStoreData();
    storeData.state.activeTaskIntervalId = null;
    const wrapper = createWrapper(task, { propsData }, storeData)
    const methodStub = sinon.stub(wrapper.vm, 'update')

    wrapper.vm.launchTask()
    setTimeout(async () => {
      expect(methodStub.calledOnceWith(true)).to.be.true
      sinon.restore()
    }, 0)
  });
})
