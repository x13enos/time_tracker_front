import createWrapper from '@/test/support/create_wrapper.js'
import reports from '@/pages/reports'

it('should return the right headers with total amount', async () => {
  const wrapper = createWrapper(reports, {}, fakeStoreData())

  wrapper.vm.totalAmount = 110.25

  expect(wrapper.vm.headers).to.eql([
    { text: 'Project', value: 'node.project.name' },
    { text: 'Date', value: 'node.assignedDate' },
    { text: 'Employee', value: 'node.user.name' },
    { text: 'Description', value: 'node.description' },
    { text: `Amount(110.25)`, value: 'node.spentTime' }
  ])

})
