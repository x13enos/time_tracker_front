import { mount } from '@vue/test-utils'
import formMixin from '@/mixins/form'


describe('$formErrorMessage', () => {

  const mocks = {
    $t: () => {}
  }

  it('should call locale and return message based on passed validation', () => {
    mocks.$v = { "name": { $dirty: true, required: false } }
    const localeStub = sinon.stub(mocks, "$t")
    const wrapper = mount({ render() {}, mixins: [formMixin] }, { mocks })

    wrapper.vm.$formErrorMessage('name', ["required"])
    expect(localeStub.calledOnceWith('validations.required')).to.be.true
    sinon.restore()
  });

  it('should call locale in snake case', () => {
    mocks.$v = { "password": { $dirty: true, required: false } }
    const localeStub = sinon.stub(mocks, "$t")
    const wrapper = mount({ render() {}, mixins: [formMixin] }, { mocks })

    wrapper.vm.$formErrorMessage('password', ["sameAsPassword"])
    expect(localeStub.calledOnceWith('validations.same_as_password')).to.be.true
    sinon.restore()
  });

  it('should return empty array if dirty attribute is false', () => {
    mocks.$v = { "password": { $dirty: false, sameAsPassword: false } }
    const localeStub = sinon.stub(mocks, "$t")
    const wrapper = mount({ render() {}, mixins: [formMixin] }, { mocks })

    wrapper.vm.$formErrorMessage('password', ["sameAsPassword"])
    expect(localeStub.called).to.be.false

    sinon.restore()
  });

  it('should return several error messages if they were failed', () => {
    mocks.$v = { "email": { $dirty: true, required: false, email: false } }

    const localeStub = sinon.stub(mocks, "$t")
    localeStub.withArgs("validations.required").returns("it is required")
    localeStub.withArgs("validations.email").returns("email is invalid")
    const wrapper = mount({ render() {}, mixins: [formMixin] }, { mocks })

    expect(wrapper.vm.$formErrorMessage('email', ["required", "email"])).to.eql(
      ["it is required", "email is invalid"]
    )
    sinon.restore()
  });

  it('should add errors from errorMessages', () => {
    mocks.$v = { "email": { $dirty: true, required: false, email: false } }

    const localeStub = sinon.stub(mocks, "$t")
    const wrapper = mount({ render() {}, mixins: [formMixin] }, { mocks })
    wrapper.vm.errorMessages = { email: ["big error", 'another error'] }

    expect(wrapper.vm.$formErrorMessage('email')).to.eql(
      ["big error", "another error"]
    )
    sinon.restore()
  });

})
