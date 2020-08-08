import createWrapper from '@/test/support/create_wrapper.js'
import profile from '@/pages/profile'

describe('localeList', () => {

  const methods = {
    fetchWorkspaces: () => {},
    setNotificationValues: () => {}
  }

  const mocks = {
    $config: {
      extensionEnabled: false
    }
  }

  it('should return list of locales', function(){
    const wrapper = createWrapper(profile, { mocks, methods }, fakeStoreData())

    expect(wrapper.vm.localeList()).to.eql([
      { text: "English", value: "en" },
      { text: "Русский", value: "ru" },
    ])
  });

})
