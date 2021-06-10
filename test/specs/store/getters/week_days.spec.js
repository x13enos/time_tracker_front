import getters from '@/store/getters';
import { DateTime } from 'luxon';

describe('weekDays', () => {
  it('should return week days for selected date', () => {
    const state = { selectedDate: DateTime.local(2020, 4, 30) }
    expect(getters.weekDays(state)).to.eql([
      DateTime.local(2020, 4, 27),
      DateTime.local(2020, 4, 28),
      DateTime.local(2020, 4, 29),
      DateTime.local(2020, 4, 30),
      DateTime.local(2020, 5, 1),
      DateTime.local(2020, 5, 2),
      DateTime.local(2020, 5, 3)
    ]);
  });
});
