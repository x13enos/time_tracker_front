import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import test from 'ava';
import Vuex from 'vuex'
import task from '@/components/tasks/update_item'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

const taskData = {
  id: 125,
  project: 1,
  description: "test",
  spentTime: 0.5
}

const props = { projects: [], task: taskData }
const store = new Vuex.Store(fakeStoreData)
const $appMethods = { isEmpty: () => { return true} }

const newData = {
  description: "new text"
}

test('it should return task data', t => {
  const wrapper = shallowMount(task, { localVue, store, propsData: props, mocks: { $appMethods } } )
  Object.assign(wrapper.vm, newData)
  t.deepEqual(wrapper.vm.formData(), {
    id: 125,
    project: 1,
    description: "new text",
    spentTime: 0.5,
    active: false
  })
});
