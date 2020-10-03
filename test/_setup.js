const hooks = require('require-extension-hooks');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
require('jsdom-global')();

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { localStorage } = (new JSDOM(``, { url: "https://localhost.com" })).window;

chai.use(chaiAsPromised);
global.expect = chai.expect
window.Date = global.Date = Date;
window.localStorage = global.localStorage = localStorage;

window.localStorage = {
  getItem: (key) => { return '' }
}

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
