import BlockedDaysSearcher from '@/services/blocked_days_searcher';

describe('service BlockedDaysSearcher', () => {

  it('should return list of blocked days', function(){
    const period = { from: '05/11/2020', to: '09/11/2020' };
    const currentDates = [
      '04/11/2020',
      '05/11/2020',
      '06/11/2020',
      '07/11/2020',
      '08/11/2020',
      '09/11/2020',
      '10/11/2020'
    ]

    const searcher = new BlockedDaysSearcher(period, currentDates)
    expect(searcher.perform()).to.eql([
      '05/11/2020',
      '06/11/2020',
      '07/11/2020',
      '08/11/2020',
      '09/11/2020'
    ])
  });

});
