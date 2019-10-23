import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import test from 'ava';
import task from '@/components/tasks/create_item'

const localVue = createLocalVue()
localVue.use(Vuetify)

const props = { projects: [] }


const newData = {
  project: "1",
  description: "test",
  spentTime: 0.5,
  active: true
}

test('it should return task data', t => {
  const wrapper = shallowMount(task, { localVue, propsData: props } )
  Object.assign(wrapper.vm, newData)
  t.deepEqual(wrapper.vm.formData(), newData)
});

test('it should return default data', t => {
  const wrapper = shallowMount(task, { localVue, propsData: props } )
  t.deepEqual(wrapper.vm.formData(), {
    active: false,
    description: null,
    spentTime: 0.0,
    project: null
  })
});
