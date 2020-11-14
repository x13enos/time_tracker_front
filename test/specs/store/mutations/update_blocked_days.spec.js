import mutations from '@/store/mutations';

describe('updateBlockedDays', () => {
  const state = {
    blockedDays: []
  }

  it('should update list of blocked days', () => {
    mutations.updateBlockedDays(state, ['11/02/2020'])
    expect(state.blockedDays).to.eql(['11/02/2020'])
  })
})
