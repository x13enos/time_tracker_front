import createWrapper from '@/test/support/create_wrapper.js'
import TomatoTimer from '@/components/tasks/tomato_timer'

describe('enableTimer', () => {
  it('should request user about getting permissions', () => {
    window.Notification = {
      permission: "default",
      requestPermission: () => {}
    }
    const wrapper = createWrapper(TomatoTimer, {}, fakeStoreData())
    const requestSpy = sinon.spy(window.Notification, "requestPermission")

    wrapper.vm.enableTimer()
    expect(requestSpy.calledOnce).to.be.true
    sinon.restore()
  });

  it('should set timer variable as true', () => {
    const wrapper = createWrapper(TomatoTimer, {}, fakeStoreData())
    wrapper.vm.timer = false

    wrapper.vm.enableTimer()
    expect(wrapper.vm.timer).to.be.true
  });
});
