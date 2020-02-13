import createWrapper from '@/test/support/create_wrapper.js'
import profile from '@/pages/profile'

it("should set user data from store to the component's data", () => {
  const store = fakeStoreData()
  store.state.user = {
    name: "John",
    email: "john@example.com",
    timezone: "NY",
    locale: "en"
  }
  const wrapper = createWrapper(profile, {}, store)

  expect(wrapper.vm.form).to.eql(Object.assign(store.state.user, { password: "" }))
});
