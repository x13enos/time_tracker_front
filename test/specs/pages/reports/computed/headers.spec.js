import createWrapper from '@/test/support/create_wrapper.js'
import reports from '@/pages/reports'

describe('headers', () => {
  const mocks = { $api: {
    allTags: () => { return { data: [] } }
  } }

  it('should return the right headers with total amount', () => {
    const wrapper = createWrapper(reports, { mocks }, fakeStoreData())

    wrapper.vm.totalAmount = 110.25

    expect(wrapper.vm.headers).to.eql([
      { text: 'reports.project', value: 'project_name' },
      { text: 'reports.date', value: 'assigned_date' },
      { text: 'reports.employee', value: 'user_name' },
      { text: 'reports.description', value: 'description' },
      { text: 'reports.tags', value: 'tags' },
      { text: `reports.amount(110.25)`, value: 'spent_time' },
      { align: 'end', text: '', value: 'expand' }
    ])
  })
})
