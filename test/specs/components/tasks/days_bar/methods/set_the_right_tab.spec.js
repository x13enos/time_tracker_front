import createWrapper from '@/test/support/create_wrapper.js'
import daysBar from '@/components/tasks/days_bar'
import { DateTime } from 'luxon'

describe('setTheRightTab', () => {
  const date = DateTime.local(2019, 10, 27);
  it('should set 6 as the value for tab', () => {
    const propsData = {
      days: [],
      selectedDate: DateTime.local(2019, 11, 3),
      currentDate: date,
    }
    const wrapper = createWrapper(daysBar, { propsData }, fakeStoreData())

    wrapper.vm.setTheRightTab()
    expect(wrapper.vm.tab).to.eq(6)
  });

  it('should set 4 as the value for tab', () => {
    const propsData = {
      days: [],
      selectedDate: DateTime.local(2019, 11, 1),
      currentDate: date,
    }
    const wrapper = createWrapper(daysBar, { propsData }, fakeStoreData())

    wrapper.vm.setTheRightTab()
    expect(wrapper.vm.tab).to.eq(4)
  });

});
