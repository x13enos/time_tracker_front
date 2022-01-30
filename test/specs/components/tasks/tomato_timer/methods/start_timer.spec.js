import createWrapper from '@/test/support/create_wrapper.js'
import TomatoTimer from '@/components/tasks/tomato_timer'

describe('startTimer', () => {
  context("when selected period wasn't set or passed period isn't match it", () => {
    it('should try to pause current timer', () => {
      const wrapper = createWrapper(TomatoTimer, {}, fakeStoreData())
      wrapper.vm.selectedPeriod = null
      const pauseStub = sinon.stub(wrapper.vm, 'pauseTimer')
  
      wrapper.vm.startTimer('short_break')
      expect(pauseStub.calledOnce).to.be.true
    });

    it('should set passed period as selected one', () => {
      const wrapper = createWrapper(TomatoTimer, {}, fakeStoreData())
      wrapper.vm.selectedPeriod = null

      wrapper.vm.startTimer('short_break')
      expect(wrapper.vm.selectedPeriod).to.eq('short_break')
    });

    it('should set number of seconds according to passed period', () => {
      const wrapper = createWrapper(TomatoTimer, {}, fakeStoreData())
      wrapper.vm.totalSeconds = null

      wrapper.vm.startTimer('short_break')
      expect(wrapper.vm.totalSeconds).to.eq(300)
    });
  })

  it('should not try to pause current timer if user is going to continue current period', () => {
    const wrapper = createWrapper(TomatoTimer, {}, fakeStoreData())
    wrapper.vm.selectedPeriod = 'short_break'
    const pauseStub = sinon.stub(wrapper.vm, 'pauseTimer')

    wrapper.vm.startTimer('short_break')
    expect(pauseStub.called).to.be.false
  });

  it('should set timer value as false', () => {
    const wrapper = createWrapper(TomatoTimer, {}, fakeStoreData())
    wrapper.vm.timer = true

    wrapper.vm.startTimer('short_break')
    expect(wrapper.vm.timer).to.be.false
  });

  it('should keep interval id to the component variables', () => {
    const wrapper = createWrapper(TomatoTimer, {}, fakeStoreData())
    const timeStub = sinon.useFakeTimers()
    sinon.stub(timeStub, 'setInterval').returns(77)
    wrapper.vm.startTimer(1500)

    expect(wrapper.vm.intervalId).to.eq(77)
    sinon.restore()
  });
});

