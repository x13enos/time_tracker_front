import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import test from 'ava';
import task from '@/components/tasks/item'

const localVue = createLocalVue()
localVue.use(Vuetify)

const props = {
  projects: [],
  task: {}
}

const wrapper = shallowMount(task, { localVue, propsData: props } )

const newData = {
  project: "1",
  description: "test",
  time: 0.5,
  active: true
}

test('it should return task data', t => {
  Object.assign(wrapper.vm, newData)
  t.deepEqual(wrapper.vm.formData(), newData)
});
