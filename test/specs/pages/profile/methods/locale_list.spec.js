import createWrapper from '@/test/support/create_wrapper.js'
import profile from '@/pages/profile'

describe('localeList', () => {

  const methods = {
    fetchWorkspaces: () => {},
  }

  it('should return list of locales', function(){
    const wrapper = createWrapper(profile, { methods }, fakeStoreData())

    expect(wrapper.vm.localeList()).to.eql([
      { text: "English", value: "en" },
      { text: "Русский", value: "ru" },
    ])
  });

})
