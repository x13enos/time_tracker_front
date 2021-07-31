import mutations from '@/store/mutations';
import { DateTime } from 'luxon';

describe('updateSelectedDate', () => {
  it('should update selected date', () => {
    const state = { selectedDate: null };
    const date = DateTime.local(2020, 4, 30);
    mutations.updateSelectedDate(state, date);
    expect(state.selectedDate).to.eql(date);
  });
});
