import createWrapper from '@/test/support/create_wrapper.js'
import profile from '@/pages/profile'

describe("successCallback", () => {
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
    const callback = wrapper.vm.successCallback()

    callback()
    expect(snackStub.calledOnceWith({
      message: wrapper.vm.$t("profile.was_updated_succesfully"), color: "green"
    })).to.be.true

    sinon.restore()
  });

  it('should clean up password', () => {
    const wrapper = createWrapper(profile, { mocks, methods }, fakeStoreData())
    wrapper.vm.form.password = "11111111"
    const callback = wrapper.vm.successCallback()

    callback()
    expect(wrapper.vm.form.password).to.be.empty
  });
})
