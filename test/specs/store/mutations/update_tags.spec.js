import mutations from '@/store/mutations'

describe('updateTags', () => {
  const state = {
    tags: []
  }

  const data = [1, 2, 3]

  it('should udpated list of tags', () => {
    mutations.updateTags(state, data)
    expect(state.tags).to.eql([1, 2, 3])
  })
})
