import createWrapper from '@/test/support/create_wrapper.js'
import reports from '@/pages/reports'
const mocks = { $api: { allUsers: () => {} } }

const success_response = {
  success: () => { return true },
  data: [{ name: 'John', id: 11 }]
}

const fail_response = {
  success: () => { return false },
  errors: "errors"
}


it('should call method for fetching users', async () => {
  const apiStub = sinon.stub(mocks.$api, "allUsers").returns(fail_response)
  const wrapper = createWrapper(reports, { mocks }, fakeStoreData())

  await wrapper.vm.fetchUsers()

  expect(apiStub.calledOnce).to.be.true

  apiStub.restore()
})

it('should keep users from recieved data if request was successful', async () => {
  const apiStub = sinon.stub(mocks.$api, "allUsers").returns(success_response)
  const wrapper = createWrapper(reports, { mocks }, fakeStoreData())

  await wrapper.vm.fetchUsers()
  expect(wrapper.vm.users).to.eql([{ name: 'John', id: 11 }])

  apiStub.restore()
})
