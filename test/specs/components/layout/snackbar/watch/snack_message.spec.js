import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import test from 'ava'
import Vuex from 'vuex'
import snackbar from '@/components/layout/snackbar'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

const store = new Vuex.Store(fakeStoreData);

test('it should set show value as true if message is present', t => {
  const wrapper = shallowMount(snackbar, { localVue, store })
  wrapper.vm.show = false
  store.state.snack.message = "test message"
  t.true(wrapper.vm.show)
});

test('it should not set show value as true if message is empty', t => {
  const wrapper = shallowMount(snackbar, { localVue, store })
  store.state.snack.message = "test message"
  wrapper.vm.show = false
  store.state.snack.message = ""
  t.false(wrapper.vm.show)
});
