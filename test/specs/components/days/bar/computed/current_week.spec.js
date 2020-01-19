import createWrapper from '@/test/support/create_wrapper.js'
import bar from '@/components/days/bar'
import { DateTime } from 'luxon'

const date = DateTime.local(2019, 10, 27);

it('should return formatted range of week', () => {
  const wrapper = createWrapper(bar, {}, fakeStoreData())
  wrapper.vm.selectedDate = date
  expect(wrapper.vm.currentWeek).eq('October 21 - October 27');
});
