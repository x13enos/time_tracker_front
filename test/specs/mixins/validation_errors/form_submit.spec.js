import { mount } from '@vue/test-utils'
import formMixin from '@/mixins/form'


describe('$formErrorMessage', () => {

  const mocks = {
    $t: () => {}
  }

  const attributes = {
    request: () => { return { data: "data" } },
    successCallback: () => {},
    errorCallback: () => {}
  }

  it('should clean up list of error messages', () => {
    const wrapper = mount({ render() {}, mixins: [formMixin] }, { mocks })
    wrapper.vm.errorMessages = { name: "error" }

    wrapper.vm.$formSubmit(attributes.request)
    expect(wrapper.vm.errorMessages).to.be.empty
  });

  it('should change attribute formSubmitting to true', () => {
    const wrapper = mount({ render() {}, mixins: [formMixin] }, { mocks })
    wrapper.vm.formSubmitting = false

    wrapper.vm.$formSubmit(attributes.request)
    expect(wrapper.vm.formSubmitting).to.be.true
  });

  it('should call request', () => {
    const wrapper = mount({ render() {}, mixins: [formMixin] }, { mocks })
    const requestSpy = sinon.spy(attributes, "request")

    wrapper.vm.$formSubmit(attributes.request)
    expect(requestSpy.calledOnce).to.be.true
    sinon.restore()
  });

  it('should call success callback and pass response data', async () => {
    const wrapper = mount({ render() {}, mixins: [formMixin] }, { mocks })
    sinon.stub(attributes, "request").returns({ data: "absolute success" })
    const successCallbackSpy = sinon.spy(attributes, "successCallback")

    await wrapper.vm.$formSubmit(attributes.request, attributes.successCallback)

    expect(successCallbackSpy.calledOnce).to.be.true
    sinon.restore()
  });

  it('should change attribute formSubmitting to false', async () => {
    const wrapper = mount({ render() {}, mixins: [formMixin] }, { mocks })
    wrapper.vm.formSubmitting = true

    await wrapper.vm.$formSubmit(attributes.request)

    expect(wrapper.vm.formSubmitting).to.be.false
    sinon.restore()
  });

  it('should add errors to errorMessages in case of fail', async () => {
    const wrapper = mount({ render() {}, mixins: [formMixin] }, { mocks })
    sinon.stub(attributes, "request").rejects({ errors: "incorrect" })
    wrapper.vm.errorMessages = {}

    await wrapper.vm.$formSubmit(attributes.request)

    expect(wrapper.vm.errorMessages).to.eq("incorrect")
    sinon.restore()
  });

  it('should call error callback in case of fail', async () => {
    const wrapper = mount({ render() {}, mixins: [formMixin] }, { mocks })
    sinon.stub(attributes, "request").rejects({ name: "incorrect" })
    const errorCallbackSpy = sinon.spy(attributes, "errorCallback")

    await wrapper.vm.$formSubmit(attributes.request, attributes.successCallback, attributes.errorCallback)

    expect(errorCallbackSpy.calledOnce).to.be.true
    sinon.restore()
  });

  it('should change attribute formSubmitting to false in case of fail', async () => {
    const wrapper = mount({ render() {}, mixins: [formMixin] }, { mocks })
    sinon.stub(attributes, "request").rejects({ name: "incorrect" })
    wrapper.vm.formSubmitting = true

    await wrapper.vm.$formSubmit(attributes.request)

    expect(wrapper.vm.formSubmitting).to.be.false
    sinon.restore()
  });

})
