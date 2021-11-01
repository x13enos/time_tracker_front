import createWrapper from '@/test/support/create_wrapper.js'
import Notifications from '@/components/layout/pending_time_report_notifications'

describe('approve', () => {

  it('should call api method for approving time report', async () => {
    const wrapper = createWrapper(Notifications, {}, fakeStoreData())
    const actionStub = sinon.stub(wrapper.vm, "approveTimeReport")

    await wrapper.vm.approve(1)
    expect(actionStub.calledOnceWith(1)).to.be.true

    sinon.restore()
  });

  it('should show message about succesfull approving of time report', async () => {
    const wrapper = createWrapper(Notifications, {}, fakeStoreData())
    sinon.stub(wrapper.vm, "approveTimeReport")
    const snackStub = sinon.stub(wrapper.vm, "updateSnack")

    await wrapper.vm.approve(1)
    expect(snackStub.calledOnceWith({
      message: "time_reports.you_approved_this",
      color: "green"
    })).to.be.true

    sinon.restore()
  });

  it('should call method for handling error in case of fail', async () => {
    const wrapper = createWrapper(Notifications, {}, fakeStoreData());
    const actionStub = sinon.stub(wrapper.vm, "approveTimeReport").rejects({ errors: 'data' });
    const methodStub = sinon.stub(wrapper.vm, "handleError");

    await wrapper.vm.approve(1);
    expect(methodStub.calledOnceWith({ errors: 'data' })).to.be.true;
    sinon.restore();
  });

});
