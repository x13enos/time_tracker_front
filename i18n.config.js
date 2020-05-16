const dateTimeSample = {
  short: {
    month: 'short',
    day: 'numeric'
  },
  long: {
    month: 'long',
    day: 'numeric'
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
