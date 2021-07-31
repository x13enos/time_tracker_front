import mutations from '@/store/mutations'
import { DateTime } from 'luxon'

describe('updateCurrentDate', () => {
  it('should update current date', () => {
    const state = { currentDate: null };
    const date = DateTime.local(2020, 4, 30);
    mutations.updateCurrentDate(state, date);
    expect(state.currentDate).to.eql(date);
  })
});