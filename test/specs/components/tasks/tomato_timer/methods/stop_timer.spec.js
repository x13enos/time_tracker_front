import createWrapper from '@/test/support/create_wrapper.js'
import TomatoTimer from '@/components/tasks/tomato_timer'

describe('stopTimer', () => {
  it('should nullify number of seconds', () => {
    const wrapper = createWrapper(TomatoTimer, {}, fakeStoreData())
    wrapper.vm.totalSeconds = 1500

    wrapper.vm.stopTimer()
    expect(wrapper.vm.totalSeconds).to.eq(0)
  });

  it('should clear interval', () => {
    const wrapper = createWrapper(TomatoTimer, {}, fakeStoreData())
    const timeStub = sinon.useFakeTimers()
    const clearIntervalStub = sinon.stub(timeStub, 'clearInterval')
    wrapper.vm.intervalId = 13

    wrapper.vm.stopTimer()
    expect(clearIntervalStub.calledOnceWith(13)).to.be.true

    sinon.restore()
  });
});
