import createWrapper from '@/test/support/create_wrapper.js'
import { RouterLinkStub } from '@vue/test-utils'
import sidebar from '@/components/layout/sidebar'
import Vuetify from 'vuetify'

describe('activeWorkspace', () => {
  const computed = {
    isMobile: () => true
  }

  it('should call api method for sign out ', async () => {
    const storeData = fakeStoreData();
    storeData.state.user.workspaces = [
      { id: 1, name: 'workspace 1' },
      { id: 2, name: 'workspace 2' }
    ];
    storeData.state.user.activeWorkspaceId = 2;
    const wrapper = createWrapper(sidebar,
      {
        computed,
        stubs: { NuxtLink: RouterLinkStub },
        vuetify: new Vuetify()
      },
      storeData
    )

    expect(wrapper.vm.activeWorkspace).to.eql({ id: 2, name: 'workspace 2' })
  });

});
