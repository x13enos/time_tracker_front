import createWrapper from '@/test/support/create_wrapper.js'
import TomatoTimer from '@/components/tasks/tomato_timer'

describe('pauseTimer', () => {
  it('should clear interval', () => {
    const wrapper = createWrapper(TomatoTimer, {}, fakeStoreData())
    const timeStub = sinon.useFakeTimers()
    const clearIntervalStub = sinon.stub(timeStub, 'clearInterval')
    wrapper.vm.intervalId = 13

    wrapper.vm.pauseTimer()
    expect(clearIntervalStub.calledOnceWith(13)).to.be.true

    sinon.restore()
  });

  it('should nullify interval id variable', () => {
    const wrapper = createWrapper(TomatoTimer, {}, fakeStoreData())
    wrapper.vm.intervalId = 13

    wrapper.vm.stopTimer()
    expect(wrapper.vm.intervalId).to.be.null
  });
});
