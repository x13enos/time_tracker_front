import createWrapper from '@/test/support/create_wrapper.js'
import profile from '@/pages/profile'

describe('mounted', () => {
  const methods = {
    fetchWorkspaces: () => {},
  }

  const mocks = {
    $config: {
      extensionEnabled: false
    }
  }

  it("should set user data from store to the component's data", () => {
    const store = fakeStoreData()
    store.state.user = {
      name: "John",
      email: "john@example.com",
      timezone: "NY",
      locale: "en",
      activeWorkspaceId: 100
    }
    const wrapper = createWrapper(profile, { mocks, methods }, store)

    expect(wrapper.vm.form).to.eql(Object.assign(store.state.user, { password: "" }))
  });

  it('should fetch workspaces', () => {
    const methodStub = sinon.stub(methods, "fetchWorkspaces")
    const wrapper = createWrapper(profile, { mocks, methods }, fakeStoreData())

    expect(methodStub.calledOnce).to.be.true
    sinon.restore()
  });


});
