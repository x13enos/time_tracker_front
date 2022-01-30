import createWrapper from '@/test/support/create_wrapper.js'
import TomatoTimer from '@/components/tasks/tomato_timer'

describe('checkTimer', () => {
  context('number of seconds equal to 0', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = createWrapper(TomatoTimer, {}, fakeStoreData())
      wrapper.vm.totalSeconds = 0
    });

    it('should call stopTimer method', () => {
      window.Notification = { permission: "default" }
      const timeStub = sinon.useFakeTimers()
      const stopTimerStub = sinon.stub(wrapper.vm, 'stopTimer')

      wrapper.vm.checkTimer()
      expect(stopTimerStub.calledOnce).to.be.true

      sinon.restore()
    });

    it('should send notification in case of having permission', () => {
      window.Notification = { permission: "granted" }
      const timeStub = sinon.useFakeTimers()
      sinon.stub(timeStub, 'clearInterval')
      const methodStub = sinon.stub(wrapper.vm, "sendNotification")

      wrapper.vm.checkTimer()
      expect(methodStub.calledOnce).to.be.true

      sinon.restore()
    });
  });

  it('should reduce number of seconds', () => {
    const wrapper = createWrapper(TomatoTimer, {}, fakeStoreData())
    wrapper.vm.totalSeconds = 60

    wrapper.vm.checkTimer()
    expect(wrapper.vm.totalSeconds).to.eq(59)
  });
});
