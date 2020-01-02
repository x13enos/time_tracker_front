import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import test from 'ava'
import task from '@/components/tasks/create_item'
import Vuex from 'vuex'
import GlobalMethods from '@/services/global_methods'
import { DateTime } from 'luxon'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

const propsData = { activeDay: true, day: DateTime.local() }
const store = new Vuex.Store(fakeStoreData);
const $appMethods = { isEmpty: (value) => { return GlobalMethods.isEmpty(value) } }

test('it should return list of projects from store', t => {
  store.state.projects = [1,2,3]
  const wrapper = shallowMount(task, { localVue, store, mocks: { $appMethods }, propsData } )
  t.deepEqual(wrapper.vm.projects, [1,2,3])
});
