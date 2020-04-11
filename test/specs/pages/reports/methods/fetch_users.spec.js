import createWrapper from '@/test/support/create_wrapper.js'
import reports from '@/pages/reports'

describe("fetchUsers", () => {
  const mocks = { $api: { allUsers: () => {} } }

  const successResponse = {
    success: () => { return true },
    data: [{ name: 'John', id: 11 }]
  }

  it('should call method for fetching users', async () => {
    const apiStub = sinon.stub(mocks.$api, "allUsers").rejects('error')
    const wrapper = createWrapper(reports, { mocks }, fakeStoreData())

    try{
      await wrapper.vm.fetchUsers()
    } catch(error) {
      expect(apiStub.calledOnce).to.be.true
    }

    sinon.restore()
  })

  it('should keep users from recieved data if request was successful', async () => {
    const apiStub = sinon.stub(mocks.$api, "allUsers").returns(successResponse)
    const wrapper = createWrapper(reports, { mocks }, fakeStoreData())

    await wrapper.vm.fetchUsers()
    expect(wrapper.vm.users).to.eql([{ name: 'John', id: 11 }])

    apiStub.restore()
  })
})
