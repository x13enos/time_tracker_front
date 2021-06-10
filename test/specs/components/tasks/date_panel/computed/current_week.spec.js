import createWrapper from '@/test/support/create_wrapper.js'
import datePanel from '@/components/tasks/date_panel'
import { DateTime } from 'luxon'

describe("currentWeek", () => {

  it('should return formatted data', () => {
    const storeData = fakeStoreData();
    const selectedDate = DateTime.local(2020, 4, 30);
    const wrapper =  createWrapper(datePanel, {}, storeData)
    const i18nStub = sinon.stub(wrapper.vm, "$d")
    i18nStub.onCall(0).returns("27");
    i18nStub.onCall(1).returns("3");
    i18nStub.onCall(2).returns("May");
    i18nStub.onCall(3).returns("2020");

    expect(wrapper.vm.currentWeek).to.eq("27 - 3\n              May, 2020")
    sinon.restore();
  });
})
