import mutations from '@/store/mutations'

describe('removeUnapprovedTimePeriod', () => {
  const state = { unapprovedPeriods: [{ id: 25 }] }

  it('should remove time period from list', () => {
    mutations.removeUnapprovedTimePeriod(state, 25)
    expect(state.unapprovedPeriods).to.eql([])
  })
});
