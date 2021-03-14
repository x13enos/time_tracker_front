import createWrapper from '@/test/support/create_wrapper.js'
import reports from '@/pages/reports'

describe('indexedItems', () => {
  const mocks = { $api: {
    allTags: () => { return { data: [] } }
  } }

  it('should return the indexed list of tasks', () => {
    const wrapper = createWrapper(reports, { mocks }, fakeStoreData())

    wrapper.vm.tasks = [[1, 2, 3], [1, 2]]

    expect(wrapper.vm.indexedItems).to.eql([
      {
        id: 0,
        tasks: [1, 2, 3]
      },
      {
        id: 1,
        tasks: [1, 2]
      }
    ])
  })
})
