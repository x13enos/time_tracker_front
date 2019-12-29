import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import test from 'ava';
import Vuex from 'vuex'
import task from '@/components/tasks/create_item'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

const propsData = {
  day: new Date(),
  activeDay: false
}

const store = new Vuex.Store(fakeStoreData);
const $appMethods = { isEmpty: () => {} }

test('it should set the opposite status for start button', t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } })
  wrapper.vm.btnStartFocused = false
  wrapper.vm.toggleBtnStatus()
  t.true(wrapper.vm.btnStartFocused)
});
