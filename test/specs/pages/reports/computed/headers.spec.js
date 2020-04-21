import createWrapper from '@/test/support/create_wrapper.js'
import reports from '@/pages/reports'

describe('headers', () => {

  it('should return the right headers with total amount', async () => {
    const wrapper = createWrapper(reports, {}, fakeStoreData())

    wrapper.vm.totalAmount = 110.25

    expect(wrapper.vm.headers).to.eql([
      { text: 'reports.project', value: 'project_name' },
      { text: 'reports.date', value: 'assigned_date' },
      { text: 'reports.employee', value: 'user_name' },
      { text: 'reports.description', value: 'description' },
      { text: `reports.amount(110.25)`, value: 'spent_time' },
      { align: "end", text: "", value: 'expand' },
    ])

  })

})
