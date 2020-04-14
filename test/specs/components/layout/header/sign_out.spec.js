import createWrapper from '@/test/support/create_wrapper.js'
import { RouterLinkStub } from '@vue/test-utils'
import header from '@/components/layout/header'

describe('signOut', () => {
  const mocks = {
    $api: {
      signOut: () => { return {} }
    }
  }
  const computed = {
    isMobile: () => true
  }

  it('should call api method for sign out ', async () => {
    const actionSpy = sinon.spy(mocks.$api, "signOut")
    const wrapper = createWrapper(header,
      { mocks, computed, stubs: { NuxtLink: RouterLinkStub } },
      fakeStoreData()
    )

    await wrapper.vm.signOut()
    expect(actionSpy.calledOnce).to.be.true

    actionSpy.restore()
  });

  it('should redirect to sign in page', async () => {
    const wrapper = createWrapper(header,
      { mocks, computed, stubs: { NuxtLink: RouterLinkStub } },
      fakeStoreData()
    )
    const routerStub = sinon.stub(wrapper.vm.$router, "push")

    await wrapper.vm.signOut()
    expect(routerStub.calledOnce).to.be.true
    expect(routerStub.args[0]).to.eql(["/auth/sign-in"])

    routerStub.restore()
  });

});
