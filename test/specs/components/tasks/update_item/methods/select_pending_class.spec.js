import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import test from 'ava';
import Vuex from 'vuex'
import task from '@/components/tasks/update_item'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

const propsData = { activeDay: false, task: {} }
const store = new Vuex.Store(fakeStoreData)
const $appMethods = { isEmpty: () => { return true} }

test('it should set the right pending row class', t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } } )

  wrapper.vm.selectPendingClass()
  t.is(wrapper.vm.rowClass, "yellow lighten-3")
});
