import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import test from 'ava';
import profile from '@/pages/profile'

const localVue = createLocalVue()
localVue.use(Vuex);
localVue.use(Vuetify)

const store = new Vuex.Store(fakeStoreData);

test("it should set user data from store to the component's data", t => {
  store.state.user = {
    name: "John",
    email: "john@example.com",
    timezone: "NY"
  }
  const wrapper = shallowMount(profile, { localVue, store })

  t.deepEqual(wrapper.vm.form, Object.assign(store.state.user, { password: null }))
});
