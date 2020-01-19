import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { shallowMount, createLocalVue } from '@vue/test-utils'

const createWrapper = (component, options = {}, storeState = {}) => {
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  localVue.use(Vuex)
  const store = new Vuex.Store(storeState)
  const router = new VueRouter()

  return shallowMount(component, {
    store,
    router,
    localVue,
    ...options
  })
}

export default createWrapper;
