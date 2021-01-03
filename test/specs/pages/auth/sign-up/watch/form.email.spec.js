import createWrapper from '@/test/support/create_wrapper.js'
import { RouterLinkStub } from '@vue/test-utils'
import signUp from '@/pages/auth/sign-up'

describe("watch form.email", () => {
  const successResponse = { success: () => { return true } }
  const stubs =  { NuxtLink: RouterLinkStub }

  it('should call clear email errors', () => {
    const wrapper = createWrapper(signUp, { stubs }, fakeStoreData())
    wrapper.vm.errorMessages = { "email": ["error"] }
    wrapper.vm.form.email = "1"
    expect(wrapper.vm.errorMessages["email"]).to.be.empty
    sinon.restore()
  });
})
