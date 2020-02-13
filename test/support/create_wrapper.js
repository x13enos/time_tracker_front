import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueI18n from "vue-i18n";
import VueTestUtils from '@vue/test-utils'

VueTestUtils.config.mocks.$t = key => key
// we use randString in case when we want to avoid warnings about using non-primitive keys for lists
VueTestUtils.config.mocks.$d = key => { key || randString() }

const { shallowMount, createLocalVue } = VueTestUtils

const createWrapper = (component, options = {}, storeState = {}) => {
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  localVue.use(Vuex)
  localVue.use(VueI18n)
  const store = new Vuex.Store(storeState)
  const router = new VueRouter()

  return shallowMount(component, {
    store,
    router,
    localVue,
    ...options
  })
}


const randString = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export default createWrapper;
