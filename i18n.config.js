const dateTimeSample = {
  onlyDay: {
    day: 'numeric'
  },
  onlyMonth: {
    month: 'short'
  },
  short: {
    day: 'numeric',
    month: 'short'
  },
  long: {
    day: 'numeric',
    month: 'long'
  },
  onlyWeekday: {
    weekday: 'long'
  }
}

const dateTimeFormats = {
  'en': dateTimeSample,
  'ru': dateTimeSample
}

module.exports = {
  locales: ['en', 'ru'],
  strategy: 'no_prefix',
  defaultLocale: 'en',
  vueI18n: {
    fallbackLocale: "en",
    messages: {
      en: require("./static/locales/en.json"),
      ru: require("./static/locales/ru.json")
    },
    dateTimeFormats
  }
}
