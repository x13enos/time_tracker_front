import createWrapper from '@/test/support/create_wrapper.js'
import { RouterLinkStub } from '@vue/test-utils'
import PasswordReset from '@/pages/auth/password-reset'

describe("submit", () => {
  const successResponse = {
    success: () => { return true }
  }
  const stubs =  { NuxtLink: RouterLinkStub }
  const $route = { query: { token: "2222" } }

  it('should clean errorMessage', () => {
    const $api = { changePassword: () => { return successResponse } }
    const actionSpy = sinon.spy($api, "changePassword")
    const wrapper = createWrapper(PasswordReset, { mocks: { $api }, stubs }, fakeStoreData())
    wrapper.vm.errorMessage = "Error"

    wrapper.vm.submit()
    expect(wrapper.vm.errorMessage).to.be.empty

    sinon.restore()
  });

  it('should call action with token and passwords', async () => {
    const $api = { changePassword: () => { return successResponse } }
    const actionSpy = sinon.spy($api, "changePassword")
    const wrapper = createWrapper(PasswordReset, { mocks: { $api, $route }, stubs }, fakeStoreData())
    Object.assign(wrapper.vm, { form: {
      password: '11111111',
      confirmPassword: '11111111'
    } })

    await wrapper.vm.submit()
    expect(actionSpy.calledOnceWith({
      token: "2222",
      password: '11111111',
      confirm_password: '11111111'
    })).to.be.true

    sinon.restore()
  });

  it('should change attribute "passwordWasChanged" in case of successful request', async () => {
    const $api = { changePassword: () => { return successResponse } }
    const wrapper = createWrapper(PasswordReset, { mocks: { $api, $route }, stubs }, fakeStoreData())
    wrapper.vm.passwordWasChanged = false

    await wrapper.vm.submit()
    expect(wrapper.vm.passwordWasChanged).to.be.true

    sinon.restore()
  });

  it('should update errorMessage in case of failed request', async () => {
    const $api = { changePassword: () => { return successResponse } }
    sinon.stub($api, "changePassword").rejects(Error)
    const wrapper = createWrapper(PasswordReset, { mocks: { $api, $route }, stubs }, fakeStoreData())

    await wrapper.vm.submit()
    expect(wrapper.vm.errorMessage).to.eq(Error)

    sinon.restore()
  });
})
