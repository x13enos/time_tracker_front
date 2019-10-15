import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import {serial as test} from 'ava';
import task from '@/components/tasks/item'

const localVue = createLocalVue()
localVue.use(Vuetify)

const props = {
  projects: [],
  task: {}
}

test('it should return true if this object is new', t => {
  const wrapper = shallowMount(task, { localVue, propsData: props } )
  wrapper.vm.task.id = null
  t.true(wrapper.vm.newObject)
});

test('it should return false if this object is not new', t => {
  const wrapper = shallowMount(task, { localVue, propsData: props } )
  wrapper.vm.task.id = "1"
  t.false(wrapper.vm.newObject)
});
