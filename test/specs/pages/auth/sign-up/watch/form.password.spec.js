import createWrapper from '@/test/support/create_wrapper.js'
import { RouterLinkStub } from '@vue/test-utils'
import signUp from '@/pages/auth/sign-up'

describe("watch form.password", () => {
  const successResponse = { success: () => { return true } }
  const stubs =  { NuxtLink: RouterLinkStub }

  it('should call clear email errors', async () => {
    const wrapper = createWrapper(signUp, { stubs }, fakeStoreData())
    wrapper.vm.errorMessages = { "password": ["error"] }
    wrapper.vm.form.password = "1"

    await wrapper.vm.$nextTick();
    expect(wrapper.vm.errorMessages["password"]).to.be.empty
    sinon.restore()
  });
})
