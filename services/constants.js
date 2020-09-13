const NOTIFICATION_SETTINGS = {
  email: {
    everyone: ["email_assign_user_to_project"],
    admin: []
  }
};

const EXTENDED_NOTIFICATION_SETTINGS = {
  email: {
    everyone: [...NOTIFICATION_SETTINGS.email.everyone, ...["email_approve_period"]],
    admin: ["email_period_reports"]
  },
  telegram: {
    everyone: ["telegram_assign_user_to_project", "telegram_approve_period"],
    admin: ["telegram_daily_report"]
  }
};

export {
  NOTIFICATION_SETTINGS,
  EXTENDED_NOTIFICATION_SETTINGS
};
