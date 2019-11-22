import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import test from 'ava';
import task from '@/components/tasks/create_item'
import Vuex from 'vuex'
import GlobalMethods from '@/services/global_methods'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

const propsData = { activeDay: true, day: new Date() }

const store = new Vuex.Store(fakeStoreData);
const $appMethods = { isEmpty: (value) => { return GlobalMethods.isEmpty(value) } }

test('it should return true if project and description are empty and there is not active day ', t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } } )
  Object.assign(wrapper.vm, { project: null, description: null })
  t.true(wrapper.vm.doesNotReadyForAction)
});

test('it should return true if only project is present', t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } } )
  wrapper.vm.project = '1'
  Object.assign(wrapper.vm, { project: "1", description: null })
  t.true(wrapper.vm.doesNotReadyForAction)
});

test('it should return true if only description is present', t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } } )
  Object.assign(wrapper.vm, { project: null, description: "1" })
  t.true(wrapper.vm.doesNotReadyForAction)
});

test('it should return false if description and project are not empty', t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } } )
  Object.assign(wrapper.vm, { project: "1", description: "1" })
  t.false(wrapper.vm.doesNotReadyForAction)
});
