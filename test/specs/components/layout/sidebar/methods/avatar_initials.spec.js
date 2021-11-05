import createWrapper from '@/test/support/create_wrapper.js'
import { RouterLinkStub } from '@vue/test-utils'
import sidebar from '@/components/layout/sidebar'
import Vuetify from 'vuetify'

describe('avatarInitials', () => {

  it('should return first letters of user\'s name', async () => {
    const storeData = fakeStoreData();
    storeData.state.user = { name: 'John Doe' };
    const wrapper = createWrapper(sidebar,
      {
        stubs: { NuxtLink: RouterLinkStub },
        vuetify: new Vuetify()
      },
      storeData
    )

    expect(wrapper.vm.avatarInitials()).to.eq('JD');
  });

  it('should return first two letters of email', async () => {
    const storeData = fakeStoreData();
    storeData.state.user = { email: 'admin@example.com' };
    const wrapper = createWrapper(sidebar,
      {
        stubs: { NuxtLink: RouterLinkStub },
        vuetify: new Vuetify()
      },
      storeData
    )

    expect(wrapper.vm.avatarInitials()).to.eq('AD');
  });

});
