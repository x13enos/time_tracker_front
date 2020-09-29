import createWrapper from '@/test/support/create_wrapper.js'
import TomatoTimer from '@/components/tasks/tomato_timer'

describe('timerStarted', () => {
  it('should return true if number of seconds more thah 0', () => {
    const wrapper = createWrapper(TomatoTimer, {}, fakeStoreData())
    wrapper.vm.totalSeconds = 61

    expect(wrapper.vm.timerStarted).to.be.true
  });

  it('should return false if number of seconds equal to 0', () => {
    const wrapper = createWrapper(TomatoTimer, {}, fakeStoreData())
    wrapper.vm.totalSeconds = 0

    expect(wrapper.vm.timerStarted).to.be.false
  });
});
