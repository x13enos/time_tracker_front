import createWrapper from '@/test/support/create_wrapper.js'
import Workspaces from '@/pages/admin/workspaces'

describe('mounted', () => {

  const methods = {
    fetchWorkspaces: () => {},
    fetchUsers: () => {},
    fetchTimeLockingRules: () => {}
  }

  const mocks = {
    $config: {
      extensionEnabled: true
    }
  }

  it("should fetch projects", () => {
    const methodStub = sinon.stub(methods, 'fetchWorkspaces')
    createWrapper(Workspaces, { methods, mocks }, fakeStoreData())

    expect(methodStub.calledOnce).to.be.true

    sinon.restore()
  });

  it("should fetch users", () => {
    const methodStub = sinon.stub(methods, 'fetchUsers')
    createWrapper(Workspaces, { methods, mocks }, fakeStoreData())

    expect(methodStub.calledOnce).to.be.true

    sinon.restore()
  });

  it("should fetch time locking rules", () => {
    const methodStub = sinon.stub(methods, 'fetchTimeLockingRules')
    createWrapper(Workspaces, { methods, mocks }, fakeStoreData())

    expect(methodStub.calledOnce).to.be.true

    sinon.restore()
  });

  it("should not fetch time locking rules in case of not using extensions", () => {
    mocks.$config.extensionEnabled = false
    const methodStub = sinon.stub(methods, 'fetchTimeLockingRules')
    createWrapper(Workspaces, { methods, mocks }, fakeStoreData())

    expect(methodStub.called).to.be.false

    sinon.restore()
  });

});
