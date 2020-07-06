import createWrapper from '@/test/support/create_wrapper.js'
import Users from '@/pages/admin/users'

describe('mounted', () => {

  const methods = {
    fetchUsers: () => {}
  }

  it("should fetch users", () => {
    const methodStub = sinon.stub(methods, 'fetchUsers')
    createWrapper(Users, { methods }, fakeStoreData())

    expect(methodStub.calledOnce).to.be.true

    sinon.restore()
  });

});
