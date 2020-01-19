import createWrapper from '@/test/support/create_wrapper.js'
import profile from '@/pages/profile'
import Constants from "@/services/constants";

it('should collect list of options for timezone select', () => {
  const wrapper = createWrapper(profile, {}, fakeStoreData())
  expect(wrapper.vm.timezoneList[0]).to.eql({
    text: "International Date Line West - GMT-12",
    value: "Etc/GMT+12"
  })
});
