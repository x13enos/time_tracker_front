import createWrapper from '@/test/support/create_wrapper.js'
import TomatoTimer from '@/components/tasks/tomato_timer'

describe('parsedTime', () => {
  it('should parse and return time in the format 00:00', () => {
    const wrapper = createWrapper(TomatoTimer, {}, fakeStoreData())
    wrapper.vm.totalSeconds = 61

    expect(wrapper.vm.parsedTime).to.eq("01:01")
  });
});
