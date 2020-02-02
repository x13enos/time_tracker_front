import createWrapper from '@/test/support/create_wrapper.js'
import reports from '@/pages/reports'

describe("handledFilters", () => {
  const mocks = {
    $api: {
      allTimeRecords: () => {
        return {
          data: {
            total_spent_time: 110,
            time_records: ["time_records"]
          }
        }
      }
    }
  }


  it('should return handled dates and user id', () => {
    const wrapper = createWrapper(reports, { mocks }, fakeStoreData())
    wrapper.vm.filters = {
      fromDate: '2019-10-21',
      toDate: '2019-10-22',
      userId: 112
    }

    expect(wrapper.vm.handledFilters()).to.eql({
      fromDate: 1571616000,
      toDate: 1571702400,
      userId: 112
    })

  })
})
