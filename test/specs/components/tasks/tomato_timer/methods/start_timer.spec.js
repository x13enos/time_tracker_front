import createWrapper from '@/test/support/create_wrapper.js'
import TomatoTimer from '@/components/tasks/tomato_timer'

describe('startTimer', () => {
  it('should set passed number of seconds', () => {
    const wrapper = createWrapper(TomatoTimer, {}, fakeStoreData())
    wrapper.vm.totalSeconds = 0

    wrapper.vm.startTimer(1500)
    expect(wrapper.vm.totalSeconds).to.eq(1500)
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
