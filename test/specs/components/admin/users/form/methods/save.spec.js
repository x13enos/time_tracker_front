import createWrapper from '@/test/support/create_wrapper.js'
import form from '@/components/admin/users/form'

describe('save', () => {

  const mocks = {
    $api: { createUser: () => {} }
  }

  it('should clean error message', () => {
    sinon.stub(mocks.$api, "createUser")
    const wrapper = createWrapper(form, { mocks }, fakeStoreData())
    wrapper.vm.errorMessage = "error"

    wrapper.vm.save()
    expect(wrapper.vm.errorMessage).to.be.empty

    sinon.restore()
  });

  it('should make a request for creating user', async () => {
    const requestStub = sinon.stub(mocks.$api, "createUser")
    const wrapper = createWrapper(form, { mocks }, fakeStoreData())
    wrapper.vm.form.name = "test"
    wrapper.vm.form.email = "test@gmail.com"

    await wrapper.vm.save()
    expect(requestStub.calledOnceWith(wrapper.vm.form)).to.be.true

    sinon.restore()
  });

  it('should emit data in case of successful request', async () => {
    sinon.stub(mocks.$api, "createUser").returns( { data: { id: 1 } })
    const wrapper = createWrapper(form, { mocks }, fakeStoreData())

    await wrapper.vm.save()
    expect(wrapper.emitted("processData")[0]).to.eql([{ id: 1 }])

    sinon.restore()
  });

  it('should show snack with message', async () => {
    sinon.stub(mocks.$api, "createUser").returns({ id: 1 })
    const wrapper = createWrapper(form, { mocks }, fakeStoreData())
    const snackStub = sinon.stub(wrapper.vm, "updateSnack")

    await wrapper.vm.save()
    expect(snackStub.calledOnceWith({
      message: wrapper.vm.$t("users.invitation_email_was_sent"),
      color: "green"
    })).to.be.true

    sinon.restore()
  });

  it('should close dialog of deleting user', async () => {
    sinon.stub(mocks.$api, "createUser").returns({ id: 1 })
    const wrapper = createWrapper(form, { mocks }, fakeStoreData())
    wrapper.vm.dialog = true

    await wrapper.vm.save()
    expect(wrapper.vm.dialog).to.be.false

    sinon.restore()
  });

  it('should clean up the form', async () => {
    sinon.stub(mocks.$api, "createUser").returns({ id: 1 })
    const wrapper = createWrapper(form, { mocks }, fakeStoreData())

    await wrapper.vm.save()
    expect(wrapper.vm.form).to.eql({ name: "", email: "" })

    sinon.restore()
  });

  it('should record message in case of exception was raised', async () => {
    sinon.stub(mocks.$api, "createUser").rejects("test error")
    const wrapper = createWrapper(form, { mocks }, fakeStoreData())
    wrapper.vm.errorMessage = ""


    try{
      await wrapper.vm.save()
    } catch(error) {
      expect(wrapper.vm.errorMessage).to.eq("test error")
      sinon.restore()
    }
  });

});
