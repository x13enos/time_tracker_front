import createWrapper from '@/test/support/create_wrapper.js'
import Projects from '@/pages/admin/projects'

describe('mounted', () => {

  const methods = {
    fetchProjects: () => {},
    fetchUsers: () => {}
  }

  it("should fetch projects", () => {
    const methodStub = sinon.stub(methods, 'fetchProjects')
    createWrapper(Projects, { methods }, fakeStoreData())

    expect(methodStub.calledOnce).to.be.true

    sinon.restore()
  });

  it("should fetch users", () => {
    const methodStub = sinon.stub(methods, 'fetchUsers')
    createWrapper(Projects, { methods }, fakeStoreData())

    expect(methodStub.calledOnce).to.be.true

    sinon.restore()
  });

});
