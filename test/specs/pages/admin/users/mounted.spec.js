import createWrapper from '@/test/support/create_wrapper.js'
import Users from '@/pages/admin/users'

describe('mounted', () => {

  const mocks = {
    $config: { extensionEnabled: true },
    $api: { getUsersForManaging: () => ({}) }
  }

  it("should fetch users", () => {
    const endpointStub = sinon.stub(mocks.$api, 'getUsersForManaging').returns({ data: {} })
    createWrapper(Users, { mocks }, fakeStoreData())

    expect(endpointStub.calledOnce).to.be.true

    sinon.restore()
  });

});
