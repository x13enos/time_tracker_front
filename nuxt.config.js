require('dotenv').config()

export default {
  publicRuntimeConfig: {
    extensionEnabled: process.env.EXTENSION_ENABLED
  },
  telemetry: false,
  mode: 'spa',
  server: {
    host: process.env.HOST_IP || 'localhost' // default: localhost
  },
  head: {
    title: process.env.npm_package_name || 'Time Tracker',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "@/plugins/api.js",
    "@/plugins/app_methods.js",
    "@/plugins/v_clipboard.js",
    "@/plugins/vueflags.js",
    '@plugins/i18n-config.js'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/proxy',
    'nuxt-i18n'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  i18n: require("./i18n.config.js"),
  axios: {
    headers: {
      'Content-Type': 'application/json'
    }
  },
  proxy: {
    '/api': {
      target: process.env.BASE_URL || 'http://localhost:3000/',
      pathRewrite: {
        '^/api' : '/v1'
      }
    }
  },
  serverMiddleware: [
    '~/middleware/redirects.js'
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
