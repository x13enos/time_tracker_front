import createWrapper from '@/test/support/create_wrapper.js'
import { RouterLinkStub } from '@vue/test-utils'
import signUp from '@/pages/auth/sign-up'

describe("onSubmit", () => {
  const successResponse = {
    success: () => { return true },
    data: {
      token: "123"
    }
  }

  const stubs =  { NuxtLink: RouterLinkStub }

  it('should call endpoint of register user', async () => {
    const $api = { signUp: () => { return successResponse } }
    const actionSpy = sinon.spy($api, "signUp")
    const wrapper = createWrapper(signUp, { mocks: { $api }, stubs }, fakeStoreData())
    wrapper.vm.form = { email: 'example@gmail.com', password: '11111111' }
    sinon.stub(wrapper.vm.$router, 'push')

    await wrapper.vm.onSubmit()
    expect(actionSpy.calledOnceWith({
      email: 'example@gmail.com',
      password: '11111111'
    })).to.be.true

    sinon.restore()
  });

  it('should update user data in store if status is success', async () => {
    const $api = { signUp: () => { return successResponse } }
    const wrapper = createWrapper(signUp, { mocks: { $api }, stubs }, fakeStoreData())
    const mutationStub = sinon.stub(wrapper.vm, 'updatePersonalInfo')

    await wrapper.vm.onSubmit()
    expect(mutationStub.calledOnce).to.be.true
    expect(mutationStub.args[0]).to.eql([{ token: "123" }])

    mutationStub.restore()
  });

  it('should redirect user to main page if status is success', async () => {
    const $api = { signUp: () => { return successResponse } }
    const wrapper = createWrapper(signUp, { mocks: { $api }, stubs }, fakeStoreData())
    const routerStub = sinon.stub(wrapper.vm.$router, 'push')

    await wrapper.vm.onSubmit()
    expect(routerStub.calledOnceWith('/tasks')).to.be.true

    routerStub.restore()
  });

  it('should write errors from response to variable if status is "fail"', async () => {
    const $api = { signUp: () => {} }
    sinon.stub($api, "signUp").rejects({ base: 'error' })
    const wrapper = createWrapper(signUp, { mocks: { $api }, stubs }, fakeStoreData())

    await wrapper.vm.onSubmit()

    expect(wrapper.vm.errorMessages).to.eql({ base: 'error' })
    sinon.restore()
  });
})
