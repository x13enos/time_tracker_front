import createWrapper from '@/test/support/create_wrapper.js'
import { RouterLinkStub } from '@vue/test-utils'
import sidebar from '@/components/layout/sidebar'
import Vuetify from 'vuetify'

describe('signOut', () => {
  const mocks = {
    $api: {
      signOut: () => { return {} }
    }
  }

  it('should call api method for sign out ', async () => {
    const actionSpy = sinon.spy(mocks.$api, "signOut")
    const wrapper = createWrapper(sidebar,
      {
        mocks,
        stubs: { NuxtLink: RouterLinkStub },
        vuetify: new Vuetify()
      },
      fakeStoreData()
    )

    await wrapper.vm.signOut()
    expect(actionSpy.calledOnce).to.be.true

    actionSpy.restore()
  });

  it('should redirect to sign in page', async () => {
    const wrapper = createWrapper(sidebar,
      {
        mocks,
        stubs: { NuxtLink: RouterLinkStub },
        vuetify: new Vuetify()
      },
      fakeStoreData()
    )
    const routerStub = sinon.stub(wrapper.vm.$router, "push")

    await wrapper.vm.signOut()
    expect(routerStub.calledOnce).to.be.true
    expect(routerStub.args[0]).to.eql(["/auth/sign-in"])

    routerStub.restore()
  });

});
