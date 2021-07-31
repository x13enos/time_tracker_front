import storeGetters from '@/store/getters';
import { DateTime } from 'luxon';

describe('activeDay', () => {
  const getters = Object.assign({}, storeGetters)

  it('should return true if currentDate is equal to day', () => {
    const state = {
      selectedDate: DateTime.local(2019, 10, 27),
      currentDate: DateTime.local(2019, 10, 27),
    };

    expect(getters.activeDay(state)).to.be.true;
  })

  it('should return false if currentDate is not equal to day', () => {
    const state = {
      selectedDate: DateTime.local(2019, 10, 27),
      currentDate: DateTime.local(2019, 10, 28),
    };
    
    expect(getters.activeDay(state)).to.be.false;
  })
});
