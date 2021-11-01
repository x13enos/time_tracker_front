import createWrapper from '@/test/support/create_wrapper.js'
import { RouterLinkStub } from '@vue/test-utils'
import signIn from '@/pages/auth/sign-in'

describe("onSubmit", () => {
  const successResponse = {
    success: () => { return true },
    data: {
      token: "123"
    }
  }

  const stubs =  { NuxtLink: RouterLinkStub }

  it('should call action with filled data', async () => {
    const $api = { signIn: () => { return successResponse } }
    const actionSpy = sinon.spy($api, "signIn")
    const wrapper = createWrapper(signIn, { mocks: { $api }, stubs }, fakeStoreData())
    sinon.stub(wrapper.vm, 'handledFormData').returns({ email: 'example@gmail.com' })
    sinon.stub(wrapper.vm.$router, 'replace')

    await wrapper.vm.onSubmit()
    expect(actionSpy.calledOnceWith({ email: 'example@gmail.com' })).to.be.true

    sinon.restore()
  });

  it('should update user data in store if status is success', async () => {
    const $api = { signIn: () => { return successResponse } }
    const wrapper = createWrapper(signIn, { mocks: { $api }, stubs }, fakeStoreData())
    const mutationStub = sinon.stub(wrapper.vm, 'updatePersonalInfo')

    await wrapper.vm.onSubmit()
    expect(mutationStub.calledOnce).to.be.true
    expect(mutationStub.args[0]).to.eql([{ token: "123" }])

    mutationStub.restore()
  });

  it('should redirect user to main page if status is success', async () => {
    const $api = { signIn: () => { return successResponse } }
    const wrapper = createWrapper(signIn, { mocks: { $api }, stubs }, fakeStoreData())
    const routerStub = sinon.stub(wrapper.vm.$router, 'replace')

    await wrapper.vm.onSubmit()
    expect(routerStub.calledOnce).to.be.true
    expect(routerStub.args[0]).to.eql([{ path: '/tasks' }])

    routerStub.restore()
  });

  it('should write errors from response to variable if status is "fail"', async () => {
    const $api = { signIn: () => {} }
    sinon.stub($api, "signIn").rejects({ errors: 'error' })
    const wrapper = createWrapper(signIn, { mocks: { $api }, stubs }, fakeStoreData())

    await wrapper.vm.onSubmit()

    expect(wrapper.vm.errorMessages).to.eql('error')
    sinon.restore()
  });
})
