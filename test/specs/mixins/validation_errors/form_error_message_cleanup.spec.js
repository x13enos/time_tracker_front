import { mount } from '@vue/test-utils'
import formMixin from '@/mixins/form'


describe('$formErrorMessage', () => {

  it('should delete error message if it exists', () => {
    const wrapper = mount({ render() {}, mixins: [formMixin] })
    wrapper.vm.errorMessages = { 'confirm_password': ['error'] }

    wrapper.vm.$formErrorMessageCleanUp('confirmPassword')
    expect(wrapper.vm.errorMessages['confirm_password']).to.be.undefined
  });

})
