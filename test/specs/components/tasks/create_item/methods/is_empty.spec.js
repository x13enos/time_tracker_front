import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import test from 'ava';
import task from '@/components/tasks/create_item'

const localVue = createLocalVue()
localVue.use(Vuetify)

const props = {
  projects: [],
  task: {}
}

const wrapper = shallowMount(task, { localVue, propsData: props } )

test('it should return true for undefined', t => {
  t.true(wrapper.vm.isEmpty(undefined))
});

test('it should return true for null', t => {
  t.true(wrapper.vm.isEmpty(null))
});

test('it should return true for empty string', t => {
  t.true(wrapper.vm.isEmpty(''))
});

test('it should return true for empty array', t => {
  t.true(wrapper.vm.isEmpty([]))
});

test('it should return false for non empty string', t => {
  t.false(wrapper.vm.isEmpty("test"))
});
