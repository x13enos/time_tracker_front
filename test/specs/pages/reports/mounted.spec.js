import createWrapper from '@/test/support/create_wrapper.js'
import reports from '@/pages/reports'

describe("mounted", () => {
  it('should set user id from store', async () => {
    const store = fakeStoreData()
    store.state.user.id = "Vx2f9sdf"
    const wrapper = createWrapper(reports, {}, store)

    expect(wrapper.vm.filters.userId).to.eq("Vx2f9sdf")
  })

  it('should call method for fetching users if user is admin', async () => {
    const store = fakeStoreData()
    store.getters = {
      isManager: () => true
    }

    const methods = { fetchUsers: () => {} }
    const methodStub = sinon.stub(methods, 'fetchUsers')
    createWrapper(reports, { methods }, store)

    expect(methodStub.calledOnce).to.be.true

    methodStub.restore()
  })

  it('should not call method for fetching users if user is not admin', async () => {
    const store = fakeStoreData()
    store.getters = {
      isManager: () => false
    }

    const methods = {
      fetchUsers: () => {}
    }
    const methodStub = sinon.stub(methods, 'fetchUsers')
    createWrapper(reports, { methods }, store)

    expect(methodStub.calledOnce).to.be.false

    methodStub.restore()
  })

})
