import createWrapper from '@/test/support/create_wrapper.js'
import profile from '@/pages/profile'

describe('setNotificationValues', () => {

  const methods = {
    fetchWorkspaces: () => {}
  }

  const mocks = {
    $config: {
      extensionEnabled: true
    }
  }

  const storeData = fakeStoreData();
  storeData.state.user.notificationSettings = [
    'email_approved_period', 'email_assign_user_to_project', 'telegram_approve_period'
  ]

  it('should select and set settings for email notifications', function(){
    const wrapper = createWrapper(profile, { mocks, methods }, storeData);

    wrapper.vm.setNotificationValues();
    expect(wrapper.vm.form.emailSettings).to.eql(['email_approved_period', 'email_assign_user_to_project']);
  });

  it('should select and set settings for telegram notifications', function(){
    const wrapper = createWrapper(profile, { mocks, methods }, storeData);

    wrapper.vm.setNotificationValues();
    expect(wrapper.vm.form.telegramSettings).to.eql(['telegram_approve_period']);
  });

  it('should not select and set settings for telegram notifications if extension was not enabled', function(){
    const wrapper = createWrapper(profile, { mocks: { $config: { extensionEnabled: false } }, methods }, storeData);

    wrapper.vm.setNotificationValues();
    expect(wrapper.vm.form.telegramSettings).to.eql([]);
  });


})
