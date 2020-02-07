import createWrapper from '@/test/support/create_wrapper.js'
import reports from '@/pages/reports';
import { DateTime } from 'luxon';

describe("setDates", () => {
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
  const time = DateTime.fromObject({ year: 2020, month: 1, day: 2 })

  it('should set date from', async () => {
    const wrapper = createWrapper(reports, { mocks }, fakeStoreData())

    await wrapper.vm.setDates('week', time)
    expect(wrapper.vm.filters.fromDate).to.eq("2019-12-30")
  })

  it('should set date to', async () => {
    const wrapper = createWrapper(reports, { mocks }, fakeStoreData())

    await wrapper.vm.setDates('week', time)
    expect(wrapper.vm.filters.toDate).to.eq("2020-01-05")
  })
})
