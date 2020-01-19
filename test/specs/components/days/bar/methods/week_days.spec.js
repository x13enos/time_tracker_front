import createWrapper from '@/test/support/create_wrapper.js'



import bar from '@/components/days/bar';
import { DateTime } from 'luxon';

const date = DateTime.local(2019, 10, 24);

it('should return 7 days of week', () => {
  const wrapper = createWrapper(bar, {}, fakeStoreData())

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
