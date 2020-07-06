import createWrapper from '@/test/support/create_wrapper.js'
import TimeReportsBlock from '@/components/admin/users/time_reports_block'

describe('watch approved status', () => {
  const propsData = {
    userId: 1
  }

  it("should fetch periods if this dialog was opened", () => {
    const wrapper = createWrapper(TimeReportsBlock, { propsData }, fakeStoreData())
    const fetchPeriodsStub = sinon.stub(wrapper.vm, "fetchUserTimeReports")

    wrapper.vm.dialog = true
    expect(fetchPeriodsStub.calledOnce).to.be.true

    sinon.restore()
  });

});
