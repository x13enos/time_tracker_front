import createWrapper from '@/test/support/create_wrapper.js'
import profile from '@/pages/profile'

describe('created', () => {

  let storeData;

  beforeEach(() => {
    storeData = fakeStoreData();
    storeData.state.user.notificationSettings = [
      'email_approved_period', 'email_assign_user_to_project', 'telegram_approve_period'
    ]
  })

  const mocks = {
    $config: { extensionEnabled: true }
  }

  it("should set user data from store to the component's data", () => {
    storeData.state.user = {
      name: "John",
      email: "john@example.com",
      emailSettings: [],
      timezone: "NY",
      locale: "en",
      telegramSettings: [],
      notificationSettings: [],
      activeWorkspaceId: 100
    }
    const wrapper = createWrapper(profile, { mocks }, storeData)

    expect(wrapper.vm.form).to.eql(Object.assign(storeData.state.user, { password: "" }))
  });



  it('should select and set settings for email notifications', function(){
    const wrapper =  createWrapper(profile, { mocks }, storeData);
    expect(wrapper.vm.form.emailSettings).to.eql(['email_approved_period', 'email_assign_user_to_project']);
  });

  it('should select and set settings for telegram notifications', function(){
    const wrapper = createWrapper(profile, { mocks }, storeData);
    expect(wrapper.vm.form.telegramSettings).to.eql(['telegram_approve_period']);
  });

  it('should not select and set settings for telegram notifications if extension was not enabled', function(){
    const wrapper = createWrapper(profile, { mocks: { $config: { extensionEnabled: false } } }, storeData);
    expect(wrapper.vm.form.telegramSettings).to.eql([]);
  });


});
