import createWrapper from '@/test/support/create_wrapper.js'
import Notifications from '@/components/layout/pending_time_report_notifications'

describe('handleError', () => {

  it('should modify add dates to the html message and update snack with that', async () => {
    const wrapper = createWrapper(Notifications, {}, fakeStoreData())
    const snackStub = sinon.stub(wrapper.vm, "updateSnack")

    wrapper.vm.handleError({ errors: { base: ['Data error'] }, dates: ["2021-10-28", "2021-10-29"] })
    const htmlContent = `Data error <a href='/tasks?date=2021-10-28' class="snackbar-link">2021-10-28</a>, <a href='/tasks?date=2021-10-29' class="snackbar-link">2021-10-29</a>`
    expect(snackStub.calledOnceWith({ htmlContent, color: 'red' })).to.be.true
    sinon.restore()
  });

  it('should update snack with the regular error', async () => {
    const wrapper = createWrapper(Notifications, {}, fakeStoreData())
    const snackStub = sinon.stub(wrapper.vm, "updateSnack")

    wrapper.vm.handleError({ errors: { base: ['Data error'] }, dates: [] })
    expect(snackStub.calledOnceWith({ htmlContent: 'Data error ', color: 'red' })).to.be.true
    sinon.restore()
  });

});