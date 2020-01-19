const hooks = require('require-extension-hooks');

require('jsdom-global')();
require('browser-env');
global.expect = require('chai').expect
window.Date = global.Date = Date;

global.fakeStoreData = require("./support/fake_store_data.js");
global.sinon = require('sinon')

const Vue = require('vue')
const Vuetify = require('vuetify')
Vue.use(Vuetify)

hooks('vue')
  .plugin('vue')
  .push();
hooks(['vue', 'js'])
  .exclude(({ filename }) => filename.match(/\/node_modules\//))
  .plugin('babel')
  .push();
