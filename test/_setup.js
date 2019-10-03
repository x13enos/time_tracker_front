const hooks = require('require-extension-hooks');

require('jsdom-global')();
require('browser-env');
const Vue = require('vue');
Vue.config.productionTip = false;
window.Date = global.Date = Date;

global.fakeStoreData = require("./support/fake_store_data.js");
global.sinon = require('sinon')

hooks('vue')
  .plugin('vue')
  .push();
hooks(['vue', 'js'])
  .exclude(({ filename }) => filename.match(/\/node_modules\//))
  .plugin('babel')
  .push();
