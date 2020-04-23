import createWrapper from '@/test/support/create_wrapper.js'
import reports from '@/pages/reports';

describe("totalTime", () => {
  it('should return total time for group of tasks', async () => {
    const wrapper = createWrapper(reports, {}, fakeStoreData())

    expect(wrapper.vm.totalTime([{ spent_time: 0.75 }, { spent_time: 1.28 }])).to.eq("2.03")
  })
})
