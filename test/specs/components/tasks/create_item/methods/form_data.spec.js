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

const newData = {
  project: "1",
  description: "test",
  spentTime: 0.5,
  active: true
}

test('it should return task data', t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } } )
  Object.assign(wrapper.vm, newData)
  t.deepEqual(wrapper.vm.formData(), newData)
});

test('it should return default data', t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } } )
  t.deepEqual(wrapper.vm.formData(), {
    active: false,
    description: null,
    spentTime: 0.0,
    project: null
  })
});
