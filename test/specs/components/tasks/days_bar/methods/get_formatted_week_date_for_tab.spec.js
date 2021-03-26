import createWrapper from '@/test/support/create_wrapper.js'
import daysBar from '@/components/tasks/days_bar'
import { DateTime } from 'luxon'

describe('getFormattedWeekDateForTab', () => {
  const date = DateTime.local(2019, 10, 27);
  const propsData = {
    selectedDate: date,
    currentDate: date,
  }

  it('should return a date in the right format', () => {
    const wrapper = createWrapper(daysBar, { propsData }, fakeStoreData())
    sinon.stub(wrapper.vm, "$d").withArgs(date, 'onlyWeekday').returns("Friday")

    expect(wrapper.vm.getFormattedWeekDateForTab(date)).to.eq("Friday")
    sinon.restore()
  });
});
