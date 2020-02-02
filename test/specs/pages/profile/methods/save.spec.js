import createWrapper from '@/test/support/create_wrapper.js'
import profile from '@/pages/profile'

const successResponse = { success: () => { return true } }

describe("save", () => {
  it('should call method for updating user profile', () => {
    const wrapper = createWrapper(profile, {}, fakeStoreData())
    const updateStub = sinon.stub(wrapper.vm, "updateUserProfile").returns(successResponse)

    wrapper.vm.save()

    expect(updateStub.calledOnce).to.be.true
    expect(updateStub.args[0]).to.eql([wrapper.vm.form])

    updateStub.restore()
  })

  it('should clean up password field after updating', async () => {
    const wrapper = createWrapper(profile, {}, fakeStoreData())
    const updateStub = sinon.stub(wrapper.vm, "updateUserProfile").returns(successResponse)
    wrapper.vm.form.pasword = "11111111"
    await wrapper.vm.save()

    expect(wrapper.vm.form.password).to.eq("")

    updateStub.restore()
  })

  it('should show notitication for user if profile was updated', async () => {
    const wrapper = createWrapper(profile, {}, fakeStoreData())
    const snackSpy = sinon.spy(wrapper.vm, "updateSnack")
    const updateStub = sinon.stub(wrapper.vm, "updateUserProfile").returns(successResponse)

    await wrapper.vm.save()
    expect(snackSpy.calledOnce).to.be.true
    expect(snackSpy.args[0]).to.eql([{ message: "Profile was updated succesfully.", color: "green" }])

    updateStub.restore()
    snackSpy.restore()
  })

  it('should not show notitication for user if profile was not updated', async () => {
    const wrapper = createWrapper(profile, {}, fakeStoreData())
    const snackSpy = sinon.spy(wrapper.vm, "updateSnack")
    const updateStub = sinon.stub(wrapper.vm, "updateUserProfile").rejects("error")

    try{
      await wrapper.vm.save()
    } catch (error) {
      expect(snackSpy.called).to.be.false
    }

    sinon.restore()
  })
})
