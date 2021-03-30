import createWrapper from '@/test/support/create_wrapper.js'
import datePanel from '@/components/tasks/date_panel'
import { DateTime } from 'luxon'

describe("currentWeek", () => {
  const weekDays = [
    DateTime.local(2020, 4, 27),
    DateTime.local(2020, 4, 28),
    DateTime.local(2020, 4, 29),
    DateTime.local(2020, 4, 30),
    DateTime.local(2020, 5, 1),
    DateTime.local(2020, 5, 2),
    DateTime.local(2020, 5, 3)
  ];
  const date = DateTime.local(2020, 4, 30);
  const propsData = {
    days: [],
    selectedDate: date
  }

  it('should return formatted data', async () => {
    const wrapper =  createWrapper(datePanel, { propsData }, fakeStoreData())
    const i18nStub = sinon.stub(wrapper.vm, "$d")
    i18nStub.onCall(0).returns("27");
    i18nStub.onCall(1).returns("3");
    i18nStub.onCall(2).returns("May");
    i18nStub.onCall(3).returns("2020");

    await wrapper.setProps({ days: weekDays })

    expect(wrapper.vm.currentWeek).to.eq("27 - 3\n              May, 2020")
    sinon.restore();
  });
})
