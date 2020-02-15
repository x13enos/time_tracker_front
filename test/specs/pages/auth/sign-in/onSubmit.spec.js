import createWrapper from '@/test/support/create_wrapper.js'
import signIn from '@/pages/auth/sign-in'

describe("onSubmit", () => {
  const successResponse = {
    success: () => { return true },
    data: {
      token: "123"
    }
  }

  it('should call action with filled data', async () => {
    const $api = { signIn: () => { return successResponse } }
    const actionSpy = sinon.spy($api, "signIn")
    const wrapper = createWrapper(signIn, { mocks: { $api } }, fakeStoreData())
    sinon.stub(wrapper.vm.$router, 'replace')
    Object.assign(wrapper.vm, { form: { email: 'example@gmail.com', password: '11111111' } })

    await wrapper.vm.onSubmit()
    expect(actionSpy.calledOnce).to.be.true
    expect(actionSpy.args[0]).to.eql([{ email: 'example@gmail.com', password: '11111111' }])

    sinon.restore()
  });

  it('should update user data in store if status is success', async () => {
    const $api = { signIn: () => { return successResponse } }
    const wrapper = createWrapper(signIn, { mocks: { $api } }, fakeStoreData())
    const mutationStub = sinon.stub(wrapper.vm, 'updatePersonalInfo')

    await wrapper.vm.onSubmit()
    expect(mutationStub.calledOnce).to.be.true
    expect(mutationStub.args[0]).to.eql([{ token: "123" }])

    mutationStub.restore()
  });

  it('should redirect user to main page if status is success', async () => {
    const $api = { signIn: () => { return successResponse } }
    const wrapper = createWrapper(signIn, { mocks: { $api } }, fakeStoreData())
    const routerStub = sinon.stub(wrapper.vm.$router, 'replace')

    await wrapper.vm.onSubmit()
    expect(routerStub.calledOnce).to.be.true
    expect(routerStub.args[0]).to.eql([{ path: '/tasks' }])

    routerStub.restore()
  });

  it('should write errors from response to variable if status is "fail"', async () => {
    const $api = { signIn: () => {} }
    sinon.stub($api, "signIn").rejects(Error)
    const wrapper = createWrapper(signIn, { mocks: { $api } }, fakeStoreData())

    await wrapper.vm.onSubmit()

    expect(wrapper.vm.errorMessage).to.eq(Error)
    sinon.restore()
  });
})
