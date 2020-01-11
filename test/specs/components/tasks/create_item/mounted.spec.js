import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import { serial as test } from 'ava';
import Vuex from 'vuex'
import task from '@/components/tasks/create_item'
import { DateTime } from 'luxon'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

const day = DateTime.local();

const propsData = { activeDay: false, day }
const store = new Vuex.Store(fakeStoreData);
const $appMethods = { isEmpty: () => {} }

test('it should select project if it is only one in list', t => {
  store.state.projects = [{ id: 15, name: "First" }]
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } })

  t.is(wrapper.vm.project, 15)
});
