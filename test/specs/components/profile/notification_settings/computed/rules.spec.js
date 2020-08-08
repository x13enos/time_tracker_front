import createWrapper from '@/test/support/create_wrapper.js'
import NotificationSettings from '@/components/profile/notification_settings'

describe('rules', () => {
  context('extension is enabled', () => {
    const mocks = {
      $config: {
        extensionEnabled: true
      }
    }

    it('should return email rules for admin', () => {
      const store = fakeStoreData();
      store.getters = {
        isAdmin: () => true
      }
      const propsData = { value: [], typeOfNotifications: "email" }
      const wrapper = createWrapper(NotificationSettings, { propsData, mocks }, store)

      expect(wrapper.vm.rules).to.eql(["email_assign_user_to_project", "email_approve_period"])
    });

    it('should return email rules for user', () => {
      const store = fakeStoreData();
      store.getters = {
        isAdmin: () => false
      }
      const propsData = { value: [], typeOfNotifications: "email" }
      const wrapper = createWrapper(NotificationSettings, { propsData, mocks }, store)

      expect(wrapper.vm.rules).to.eql(["email_assign_user_to_project", "email_approve_period"])
    });

    it('should return telegram rules for admin', () => {
      const store = fakeStoreData();
      store.getters = {
        isAdmin: () => true
      }
      const propsData = { value: [], typeOfNotifications: "telegram" }
      const wrapper = createWrapper(NotificationSettings, { propsData, mocks }, store)

      expect(wrapper.vm.rules).to.eql(["telegram_assign_user_to_project", "telegram_approve_period", "telegram_daily_report"])
    });

    it('should return telegram rules for user', () => {
      const store = fakeStoreData();
      store.getters = {
        isAdmin: () => false
      }
      const propsData = { value: [], typeOfNotifications: "telegram" }
      const wrapper = createWrapper(NotificationSettings, { propsData, mocks }, store)

      expect(wrapper.vm.rules).to.eql(["telegram_assign_user_to_project", "telegram_approve_period"])
    });
  });

  context('extension is disabled', () => {
    const mocks = {
      $config: {
        extensionEnabled: false
      }
    }

    it('should return email rules for admin', () => {
      const store = fakeStoreData();
      store.getters = {
        isAdmin: () => true
      }
      const propsData = { value: [], typeOfNotifications: "email" }
      const wrapper = createWrapper(NotificationSettings, { propsData, mocks }, store)

      expect(wrapper.vm.rules).to.eql(["email_assign_user_to_project"])
    });

    it('should return email rules for user', () => {
      const store = fakeStoreData();
      store.getters = {
        isAdmin: () => false
      }
      const propsData = { value: [], typeOfNotifications: "email" }
      const wrapper = createWrapper(NotificationSettings, { propsData, mocks }, store)

      expect(wrapper.vm.rules).to.eql(["email_assign_user_to_project"])
    });
  });


});
