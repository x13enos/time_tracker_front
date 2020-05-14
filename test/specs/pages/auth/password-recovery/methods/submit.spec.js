import createWrapper from '@/test/support/create_wrapper.js'
import { RouterLinkStub } from '@vue/test-utils'
import PasswordRecovery from '@/pages/auth/password-recovery'

describe("submit", () => {
  const successResponse = {
    success: () => { return true }
  }
  const stubs =  { NuxtLink: RouterLinkStub }

  it('should clean errorMessages', () => {
    const $api = { forgotPassword: () => { return successResponse } }
    const wrapper = createWrapper(PasswordRecovery, { mocks: { $api }, stubs }, fakeStoreData())
    wrapper.vm.errorMessages = "Error"

    wrapper.vm.submit()
    expect(wrapper.vm.errorMessages).to.be.empty

    sinon.restore()
  });

  it('should call action and pass email', async () => {
    const $api = { forgotPassword: () => { return successResponse } }
    const actionSpy = sinon.spy($api, "forgotPassword")
    const wrapper = createWrapper(PasswordRecovery, { mocks: { $api }, stubs }, fakeStoreData())
    wrapper.vm.email = "test@gmail.com"

    await wrapper.vm.submit()
    expect(actionSpy.calledOnceWith("test@gmail.com")).to.be.true

    sinon.restore()
  });

  it('should show message via snack', async () => {
    const $api = { forgotPassword: () => { return successResponse } }
    const wrapper = createWrapper(PasswordRecovery, { mocks: { $api }, stubs }, fakeStoreData())
    const snackSpy = sinon.spy(wrapper.vm, "updateSnack")
    wrapper.vm.email = "test@gmail.com"

    await wrapper.vm.submit()
    expect(snackSpy.calledOnceWith({
      message: "password_recovery.we_sent_email",
      color: "green"
    })).to.be.true

    sinon.restore()
  });

  it('should write errors from response to variable if status is "fail"', async () => {
    const $api = { forgotPassword: () => {} }
    sinon.stub($api, "forgotPassword").rejects(Error)
    const wrapper = createWrapper(PasswordRecovery, { mocks: { $api }, stubs }, fakeStoreData())

    await wrapper.vm.submit()

    expect(wrapper.vm.errorMessages).to.eq(Error)
    sinon.restore()
  });
})
