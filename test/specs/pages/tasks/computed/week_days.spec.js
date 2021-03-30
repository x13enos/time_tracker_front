import createWrapper from '@/test/support/create_wrapper.js'
import tasks from '@/pages/tasks'
import { DateTime } from 'luxon'


describe('week_days', () => {

  it('should return week days for selected date', () => {
    const wrapper = createWrapper(tasks, {}, fakeStoreData())
    wrapper.vm.selectedDate = DateTime.local(2020, 4, 30)

    expect(wrapper.vm.weekDays).to.eql([
      DateTime.local(2020, 4, 27),
      DateTime.local(2020, 4, 28),
      DateTime.local(2020, 4, 29),
      DateTime.local(2020, 4, 30),
      DateTime.local(2020, 5, 1),
      DateTime.local(2020, 5, 2),
      DateTime.local(2020, 5, 3)
    ])
  });

});
