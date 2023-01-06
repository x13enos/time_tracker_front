import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'
import * as VueTestUtils from '@vue/test-utils';
import $appMethods from '@/services/global_methods';

VueTestUtils.config.mocks.$t = key => key
VueTestUtils.config.mocks.$tc = key => key

// we use randString in case when we want to avoid warnings about using non-primitive keys for lists
VueTestUtils.config.mocks.$d = (key) => { key || randString() }
VueTestUtils.config.mocks.$appMethods = $appMethods
VueTestUtils.config.mocks.$currentFontClass = () => "poppins";

const { shallowMount, createLocalVue } = VueTestUtils

const createWrapper = (component, options = {}, storeState = {}) => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const store = new Vuex.Store(storeState)

  const wrapperOptions = {
    store,
    localVue,
    ...options
  }

  if(routerShouldBeAdd(options)){
    localVue.use(VueRouter);
    wrapperOptions.router = new VueRouter();
  }

  if(i18nShouldBeAdd(options)) {
    localVue.use(VueI18n)
  }

  return shallowMount(component, wrapperOptions);
}

const randString = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

const i18nShouldBeAdd = (options) => {
  return (
    !options.mocks || (!!options.mocks && !Object.keys(options.mocks).includes("$i18n"))
  )
}

const routerShouldBeAdd = (options) => {
  return (
    !options.mocks || (!!options.mocks && Object.keys(options.mocks).every((key) => {
      return !["$router", "$route"].includes(key);
    }))
  )
}

export default createWrapper
