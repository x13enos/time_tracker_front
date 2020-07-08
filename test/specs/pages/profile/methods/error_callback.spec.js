import createWrapper from '@/test/support/create_wrapper.js'
import profile from '@/pages/profile'

describe("errorCallback", () => {
  const methods = {
    fetchWorkspaces: () => {},
  }

  const mocks = {
    $config: {
      extensionEnabled: false
    }
  }

  it('should update snack', () => {
    const wrapper = createWrapper(profile, { mocks, methods }, fakeStoreData())
    const snackStub = sinon.stub(wrapper.vm, 'updateSnack')
    const callback = wrapper.vm.errorCallback()

    callback()
    expect(snackStub.calledOnceWith({
      message: wrapper.vm.$t("profile.was_not_updated_succesfully"), color: "red"
    })).to.be.true

    sinon.restore()
  });
})
