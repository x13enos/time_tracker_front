import createWrapper from '@/test/support/create_wrapper.js'
import { RouterLinkStub } from '@vue/test-utils'
import PasswordReset from '@/pages/auth/password-reset'

describe("submit", () => {
  let successResponse, stubs, $route, $router, $api
  beforeEach(() => {
    successResponse = { success: () => { return true } }
    stubs =  { NuxtLink: RouterLinkStub }
    $route = { query: { token: "2222" } }
    $router = { push: () => {} }
    $api = { changePassword: () => { return successResponse } }
  });

  afterEach(() => { sinon.restore() })

  it('should clean errorMessages', () => {
    const $api = { changePassword: () => { return successResponse } }
    const actionSpy = sinon.spy($api, "changePassword")
    const wrapper = createWrapper(PasswordReset, { mocks: { $api, $route, $router }, stubs }, fakeStoreData())
    wrapper.vm.errorMessages = { base: "Error" }

    wrapper.vm.submit()
    expect(wrapper.vm.errorMessages).to.be.empty
  });

  it('should call action with token and passwords', async () => {
    const $api = { changePassword: () => { return successResponse } }
    const actionSpy = sinon.spy($api, "changePassword")
    const wrapper = createWrapper(PasswordReset, { mocks: { $api, $route, $router }, stubs }, fakeStoreData())
    Object.assign(wrapper.vm, { form: {
      password: '11111111',
      confirmPassword: '11111111'
    } })

    await wrapper.vm.submit()
    expect(actionSpy.calledOnceWith({
      token: "2222",
      password: '11111111'
    })).to.be.true
  });

  it('should redirect user to the root page', async () => {
    const routerStub = sinon.stub($router, 'push')
    const wrapper = createWrapper(PasswordReset, { mocks: { $api, $route, $router }, stubs }, fakeStoreData())

    await wrapper.vm.submit()
    expect(routerStub.calledOnceWith('/')).to.be.true
  });

  it('should update errorMessage in case of failed request', async () => {
    const $api = { changePassword: () => { return successResponse } }
    sinon.stub($api, "changePassword").rejects({ errors: { base: 'error' } })
    const wrapper = createWrapper(PasswordReset, { mocks: { $api, $route, $router }, stubs }, fakeStoreData())

    await wrapper.vm.submit()
    expect(wrapper.vm.errorMessages).to.eql({ base: 'error' })
  });
})
