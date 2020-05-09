import { mount } from '@vue/test-utils'
import validationErrorMixin from '@/mixins/validation_errors'

describe('$validationErrorMessage', () => {

  const mocks = {
    $t: () => {}
  }

  it('should call locale and return message based on passed validation', () => {
    const localeStub = sinon.stub(mocks, "$t")
    const attribute = { $dirty: true, required: false}
    const wrapper = mount({ render() {}, mixins: [validationErrorMixin] }, { mocks })

    wrapper.vm.$validationErrorMessage(attribute, ["required"])
    expect(localeStub.calledOnceWith('validations.required')).to.be.true
    sinon.restore()
  });

  it('should call locale in snake case', () => {
    const localeStub = sinon.stub(mocks, "$t")
    const attribute = { $dirty: true, sameAsPassword: false}
    const wrapper = mount({ render() {}, mixins: [validationErrorMixin] }, { mocks })

    wrapper.vm.$validationErrorMessage(attribute, ["sameAsPassword"])
    expect(localeStub.calledOnceWith('validations.same_as_password')).to.be.true
    sinon.restore()
  });

  it('should return empty array if dirty attribute is false', () => {
    const localeStub = sinon.stub(mocks, "$t")
    const attribute = { $dirty: false, sameAsPassword: false}
    const wrapper = mount({ render() {}, mixins: [validationErrorMixin] }, { mocks })

    wrapper.vm.$validationErrorMessage(attribute, ["sameAsPassword"])
    expect(localeStub.called).to.be.false

    sinon.restore()
  });

  it('should return several error messages if they were failed', () => {
    const localeStub = sinon.stub(mocks, "$t")
    localeStub.withArgs("validations.required").returns("it is required")
    localeStub.withArgs("validations.email").returns("email is invalid")

    const attribute = { $dirty: true, required: false, email: false }
    const wrapper = mount({ render() {}, mixins: [validationErrorMixin] }, { mocks })

    expect(wrapper.vm.$validationErrorMessage(attribute, ["required", "email"])).to.eql(
      ["it is required", "email is invalid"]
    )
    sinon.restore()
  });

})
