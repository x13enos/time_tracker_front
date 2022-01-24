import createWrapper from '@/test/support/create_wrapper.js'
import { RouterLinkStub } from '@vue/test-utils'
import Invitation from '@/pages/auth/invitation'

describe("submit", () => {
  let successResponse, stubs, $route, $router, $api

  beforeEach(() => {
    successResponse = {
      success: () => { return true }
    }
    stubs =  { NuxtLink: RouterLinkStub }
    $route = { query: { token: "2222" } }
    $router = { push: () => {} }
    $api = { setPassword: () => { return successResponse } }
  })

  afterEach(() => {
    sinon.restore()
  })

  it('should clean errorMessages', () => {
    const actionSpy = sinon.spy($api, "setPassword")
    const wrapper = createWrapper(Invitation, { mocks: { $api, $router, $route }, stubs }, fakeStoreData())
    wrapper.vm.errorMessages = { base: "Error" }

    wrapper.vm.submit()
    expect(wrapper.vm.errorMessages).to.be.empty
  });

  it('should call action with token, name and password', async () => {
    const actionSpy = sinon.spy($api, "setPassword")
    const wrapper = createWrapper(Invitation, { mocks: { $api, $route, $router }, stubs }, fakeStoreData())
    Object.assign(wrapper.vm, { form: {
      name: 'test user',
      password: '11111111'
    } })

    await wrapper.vm.submit()
    expect(actionSpy.calledOnceWith({
      token: "2222",
      name: 'test user',
      password: '11111111'
    })).to.be.true
  });

  it('should redirect user to the root page', async () => {
    const routerStub = sinon.stub($router, 'push')
    const wrapper = createWrapper(Invitation, { mocks: { $api, $route, $router }, stubs }, fakeStoreData())

    await wrapper.vm.submit()
    expect(routerStub.calledOnceWith('/')).to.be.true
  });

  it('should update errorMessage in case of failed request', async () => {
    sinon.stub($api, "setPassword").rejects({ errors: { base: 'error' } })
    const wrapper = createWrapper(Invitation, { mocks: { $api, $route, $router }, stubs }, fakeStoreData())

    await wrapper.vm.submit()
    expect(wrapper.vm.errorMessages).to.eql({ base: 'error' })
  });
})
