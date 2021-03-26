import createWrapper from '@/test/support/create_wrapper.js'
import daysBar from '@/components/tasks/days_bar'
import { DateTime } from 'luxon';

describe('weekDays', function(){
  const date = DateTime.local(2019, 10, 24);
  const propsData = {
    selectedDate: date,
    currentDate: date,
  }

  it('should return 7 days of week', () => {
    const wrapper = createWrapper(daysBar, { propsData }, fakeStoreData())

    const days = wrapper.vm.weekDays(date)
    expect(days).to.eql([
      DateTime.local(2019, 10, 21),
      DateTime.local(2019, 10, 22),
      DateTime.local(2019, 10, 23),
      DateTime.local(2019, 10, 24),
      DateTime.local(2019, 10, 25),
      DateTime.local(2019, 10, 26),
      DateTime.local(2019, 10, 27)
    ])
  });

});
