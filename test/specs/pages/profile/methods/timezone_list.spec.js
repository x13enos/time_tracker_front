import createWrapper from '@/test/support/create_wrapper.js'
import profile from '@/pages/profile'

describe('localeList', () => {

  const mocks = {
    $config: {
      extensionEnabled: false
    }
  }

  it('should return list of timezones', function(){
    const wrapper = createWrapper(profile, { mocks }, fakeStoreData())

    expect(wrapper.vm.timezoneList()[0]).to.eql(
      { text: "International Date Line West - GMT-12", value: "Etc/GMT+12" }
    )
  });

})
