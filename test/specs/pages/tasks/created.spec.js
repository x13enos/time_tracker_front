import createWrapper from '@/test/support/create_wrapper.js'
import tasks from '@/pages/tasks'

describe('created', () => {
  it('should set interval id to component data', () => {
    const timeStub = sinon.useFakeTimers()
    const intervalStub = sinon.stub(timeStub, 'setInterval').returns(77)
    const wrapper = createWrapper(tasks, {}, fakeStoreData())
    expect(wrapper.vm.intervalId).to.eq(77)

    intervalStub.restore()
    timeStub.restore()
  });
});
