import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import test from 'ava';
import Vuex from 'vuex'
import task from '@/components/tasks/create_item'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

const props = { projects: [] }
const store = new Vuex.Store(fakeStoreData);
const $appMethods = { isEmpty: () => {} }

test('it should return default data', t => {
  const wrapper = shallowMount(task, { localVue, store, propsData: props, mocks: { $appMethods } } )
  t.deepEqual(wrapper.vm.defaultData(), {
    active: false,
    description: null,
    spentTime: null,
    project: null
  })
});
