import createWrapper from '@/test/support/create_wrapper.js'
import { RouterLinkStub } from '@vue/test-utils'
import header from '@/components/layout/header'
import Vuetify from 'vuetify'

describe('changeActiveWorkspaceId', () => {
  const mocks = {
    $api: {
      changeActiveWorkspaceId: () => { return {} }
    }
  }
  const computed = {
    isMobile: () => true
  }

  it("should call api method for changing user's active workspace", async () => {
    const actionSpy = sinon.spy(mocks.$api, "changeActiveWorkspaceId")
    const wrapper = createWrapper(header,
      {
        mocks,
        computed,
        stubs: { NuxtLink: RouterLinkStub },
        vuetify: new Vuetify()
      },
      fakeStoreData()
    )
    sinon.stub(wrapper.vm.$router, "go")

    await wrapper.vm.changeWorkspace(1)
    expect(actionSpy.calledOnceWith(1)).to.be.true

    sinon.restore()
  });

  it('should refresh current page', async () => {
    const wrapper = createWrapper(header,
      {
        mocks,
        computed,
        stubs: { NuxtLink: RouterLinkStub },
        vuetify: new Vuetify()
      },
      fakeStoreData()
    )
    const routerStub = sinon.stub(wrapper.vm.$router, "go")

    await wrapper.vm.changeWorkspace(1)
    expect(routerStub.calledOnce).to.be.true

    sinon.restore()
  });

});
