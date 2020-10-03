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

const LOCALES = [
  {
    title: 'English',
    flag: "gb",
    code: "en"
  },
  {
    title: "Русский",
    flag: "ru",
    code: "ru"
  }
];

export {
  NOTIFICATION_SETTINGS,
  EXTENDED_NOTIFICATION_SETTINGS,
  LOCALES
};
