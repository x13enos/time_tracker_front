import createWrapper from '@/test/support/create_wrapper.js'
import reports from '@/pages/reports'

it('should return the right headers with total amount', async () => {
  const wrapper = createWrapper(reports, {}, fakeStoreData())

  wrapper.vm.totalAmount = 110.25

  expect(wrapper.vm.headers).to.eql([
    { text: 'Project', value: 'project_name' },
    { text: 'Date', value: 'assigned_date' },
    { text: 'Employee', value: 'user_name' },
    { text: 'Description', value: 'description' },
    { text: `Amount(110.25)`, value: 'spent_time' }
  ])

})
