import createWrapper from '@/test/support/create_wrapper.js'
import TomatoTimer from '@/components/tasks/tomato_timer'

describe('stopTimer', () => {
  it('should show modal with options', () => {
    const wrapper = createWrapper(TomatoTimer, {}, fakeStoreData())
    wrapper.vm.timer = false

    wrapper.vm.stopTimer()
    expect(wrapper.vm.timer).to.be.true
  });

  it('should nullify selected period', () => {
    const wrapper = createWrapper(TomatoTimer, {}, fakeStoreData())
    wrapper.vm.selectedPeriod = 'short_break'

    wrapper.vm.stopTimer()
    expect(wrapper.vm.selectedPeriod).to.be.null
  });

  it('should nullify number of seconds', () => {
    const wrapper = createWrapper(TomatoTimer, {}, fakeStoreData())
    wrapper.vm.totalSeconds = 1500

    wrapper.vm.stopTimer()
    expect(wrapper.vm.totalSeconds).to.eq(0)
  });

  it('should call pauseTimer method', () => {
    const wrapper = createWrapper(TomatoTimer, {}, fakeStoreData())
    const pauseTimerStub = sinon.stub(wrapper.vm, 'pauseTimer')

    wrapper.vm.stopTimer()
    expect(pauseTimerStub.calledOnce).to.be.true
    sinon.restore()
  });
});
