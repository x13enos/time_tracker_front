const hooks = require('require-extension-hooks');

if (process.env.TEST === 'unit') {
  require('jsdom-global')();
  require('browser-env');
  const Vue = require('vue');
  Vue.config.productionTip = false;
  window.Date = global.Date = Date;
  global.fakeStoreData = require("./support/fake_store_data.js");
}

if (process.env.TEST === 'e2e') {
  const jsdom = require("jsdom");
  global.JSDOM = jsdom.JSDOM;
  const Vue = require('vue');
  Vue.config.productionTip = false;
}

global.sinon = require('sinon')

hooks('vue')
  .plugin('vue')
  .push();
hooks(['vue', 'js'])
  .exclude(({ filename }) => filename.match(/\/node_modules\//))
  .plugin('babel')
  .push();
