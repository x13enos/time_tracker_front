import createWrapper from '@/test/support/create_wrapper.js'
import daysBar from '@/components/tasks/days_bar'
import { DateTime } from 'luxon'

describe('getFormattedDateForTab', () => {
  const date = DateTime.local(2019, 10, 27);
  const propsData = {
    days: [],
    selectedDate: date,
    currentDate: date,
  }

  it('should return a date in the right format', () => {
    const wrapper = createWrapper(daysBar, { propsData }, fakeStoreData())
    sinon.stub(wrapper.vm, "$d").returns("Oct 27")

    expect(wrapper.vm.getFormattedDateForTab(date)).to.eq("Oct 27")
    sinon.restore()
  });
});
