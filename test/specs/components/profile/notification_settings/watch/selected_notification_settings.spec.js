import createWrapper from '@/test/support/create_wrapper.js'
import NotificationSettings from '@/components/profile/notification_settings'

describe('selectedNotificationSettings', () => {

  const mocks = {
    $config: {
      extensionEnabled: true
    }
  }

  it('should emit data', () => {
    const propsData = {
      value: ["email_approve_period"],
      typeOfNotifications: "email"
    }
    const wrapper = createWrapper(NotificationSettings, { propsData, mocks }, fakeStoreData())

    wrapper.vm.selectedNotificationSettings = ["email_approve_period", "email_assign_user_to_project"]
    expect(wrapper.emitted('input')[0]).to.eql([["email_approve_period", "email_assign_user_to_project"]])
  });

});
