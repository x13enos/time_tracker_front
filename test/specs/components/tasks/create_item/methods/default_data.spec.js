import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import test from 'ava';
import Vuex from 'vuex'
import task from '@/components/tasks/create_item'
import { DateTime } from 'luxon'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

const propsData = {
  day: DateTime.local(),
  activeDay: false
}
const store = new Vuex.Store(fakeStoreData);
const $appMethods = { isEmpty: () => {} }

test('it should return default data', t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } } )
  t.deepEqual(wrapper.vm.defaultData(), {
    rowClass: "",
    btnStartFocused: false,
    description: null,
    spentTime: null,
    project: null
  })
});
