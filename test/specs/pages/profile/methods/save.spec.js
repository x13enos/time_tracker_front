import createWrapper from '@/test/support/create_wrapper.js'
import profile from '@/pages/profile'

describe("save", () => {
  const successResponse = { success: () => { return true } }

  const mocks = {
    $config: {
      extensionEnabled: false
    }
  }

  it('should call formSubmit method and pass callbacks', async () => {
    const wrapper = createWrapper(profile, { mocks }, fakeStoreData())
    sinon.stub(wrapper.vm, 'successCallback').returns("successCallback")
    sinon.stub(wrapper.vm, 'errorCallback').returns("errorCallback")
    const formSubmitStub = sinon.stub(wrapper.vm, "$formSubmit")

    await wrapper.vm.save()
    expect(formSubmitStub.calledOnce).to.be.true
    expect(formSubmitStub.args[0][1]).to.eq("successCallback")
    expect(formSubmitStub.args[0][2]).to.eq("errorCallback")
  });

  it('should call method for updating user profile', () => {
    const params = {
      name: 'john',
      email: 'john@gmail.com',
      locale: 'ru',
      timezone: 'Europe/Kiev',
      password: null,
      notification_rules: ["email_approve_period", "telegram_assign_user_to_project"]
    }
    const wrapper = createWrapper(profile, { mocks }, fakeStoreData())
    const updateStub = sinon.stub(wrapper.vm, "updateUserProfile").returns(successResponse)
    wrapper.setData({ form: {
      name: 'john',
      email: 'john@gmail.com',
      locale: 'ru',
      timezone: 'Europe/Kiev',
      password: '',
      emailSettings: ["email_approve_period"],
      telegramSettings: ["telegram_assign_user_to_project"]
    } })
    wrapper.vm.save()

    expect(updateStub.calledOnce).to.be.true
    expect(updateStub.args[0]).to.eql([params])

    updateStub.restore()
  })
})
