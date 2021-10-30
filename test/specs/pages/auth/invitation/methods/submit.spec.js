import createWrapper from '@/test/support/create_wrapper.js'
import { RouterLinkStub } from '@vue/test-utils'
import Invitation from '@/pages/auth/invitation'

describe("submit", () => {
  const successResponse = {
    success: () => { return true }
  }
  const stubs =  { NuxtLink: RouterLinkStub }
  const $route = { query: { token: "2222" } }

  it('should clean errorMessages', () => {
    const $api = { setPassword: () => { return successResponse } }
    const actionSpy = sinon.spy($api, "setPassword")
    const wrapper = createWrapper(Invitation, { mocks: { $api }, stubs }, fakeStoreData())
    wrapper.vm.errorMessages = "Error"

    wrapper.vm.submit()
    expect(wrapper.vm.errorMessages).to.be.empty

    sinon.restore()
  });

  it('should call action with token, name and password', async () => {
    const $api = { setPassword: () => { return successResponse } }
    const actionSpy = sinon.spy($api, "setPassword")
    const wrapper = createWrapper(Invitation, { mocks: { $api, $route }, stubs }, fakeStoreData())
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

    sinon.restore()
  });

  it('should change attribute "dataWasUpdated" in case of successful request', async () => {
    const $api = { setPassword: () => { return successResponse } }
    const wrapper = createWrapper(Invitation, { mocks: { $api, $route }, stubs }, fakeStoreData())
    wrapper.vm.dataWasUpdated = false

    await wrapper.vm.submit()
    expect(wrapper.vm.dataWasUpdated).to.be.true

    sinon.restore()
  });

  it('should update errorMessage in case of failed request', async () => {
    const $api = { setPassword: () => { return successResponse } }
    sinon.stub($api, "setPassword").rejects({ errors: { base: 'error' } })
    const wrapper = createWrapper(Invitation, { mocks: { $api, $route }, stubs }, fakeStoreData())

    await wrapper.vm.submit()
    expect(wrapper.vm.errorMessages).to.eql({ base: 'error' })

    sinon.restore()
  });
})
