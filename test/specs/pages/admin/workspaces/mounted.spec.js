import createWrapper from '@/test/support/create_wrapper.js'
import Workspaces from '@/pages/admin/workspaces'

describe('mounted', () => {

  const methods = {
    fetchWorkspaces: () => {},
    fetchUsers: () => {}
  }

  it("should fetch projects", () => {
    const methodStub = sinon.stub(methods, 'fetchWorkspaces')
    createWrapper(Workspaces, { methods }, fakeStoreData())

    expect(methodStub.calledOnce).to.be.true

    sinon.restore()
  });

  it("should fetch users", () => {
    const methodStub = sinon.stub(methods, 'fetchUsers')
    createWrapper(Workspaces, { methods }, fakeStoreData())

    expect(methodStub.calledOnce).to.be.true

    sinon.restore()
  });

});
