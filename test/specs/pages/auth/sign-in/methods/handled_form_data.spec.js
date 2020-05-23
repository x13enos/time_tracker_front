import createWrapper from '@/test/support/create_wrapper.js'
import { RouterLinkStub } from '@vue/test-utils'
import signIn from '@/pages/auth/sign-in'

describe("handledFormData", () => {
  it('should return handled data', () => {
    const wrapper = createWrapper(signIn, { stubs: { NuxtLink: RouterLinkStub } }, fakeStoreData())
    wrapper.vm.form = {
      email: "test@gmail.com",
      password: '11111111',
      rememberMe: true
    }

    expect(wrapper.vm.handledFormData()).to.eql({
      email: "test@gmail.com",
      password: '11111111',
      remember_me: true
    })
  });
})
