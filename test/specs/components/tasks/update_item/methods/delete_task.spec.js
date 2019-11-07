import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import {serial as test} from 'ava';
import Vuex from 'vuex'
import task from '@/components/tasks/update_item'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

const propsData = { task: {}, activeDay: false }
const store = new Vuex.Store(fakeStoreData)
const $appMethods = { isEmpty: () => {} }

test('it should emit call for deleting task', t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } })

  wrapper.vm.deleteTask()
  t.deepEqual(wrapper.emitted("deleteTask"), [[]])
});
