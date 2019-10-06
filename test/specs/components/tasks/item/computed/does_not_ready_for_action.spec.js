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

test('it should return true if project and description are empty', t => {
  const wrapper = shallowMount(task, { localVue, propsData: props } )
  Object.assign(wrapper.vm, { project: null, description: null })
  t.true(wrapper.vm.doesNotReadyForAction)
});

test('it should return true if only project is present', t => {
  const wrapper = shallowMount(task, { localVue, propsData: props } )
  wrapper.vm.project = '1'
  Object.assign(wrapper.vm, { project: "1", description: null })
  t.true(wrapper.vm.doesNotReadyForAction)
});

test('it should return true if only description is present', t => {
  const wrapper = shallowMount(task, { localVue, propsData: props } )
  Object.assign(wrapper.vm, { project: null, description: "1" })
  t.true(wrapper.vm.doesNotReadyForAction)
});

test('it should return false if description and project are not empty', t => {
  const wrapper = shallowMount(task, { localVue, propsData: props } )
  Object.assign(wrapper.vm, { project: "1", description: "1" })
  t.false(wrapper.vm.doesNotReadyForAction)
});
