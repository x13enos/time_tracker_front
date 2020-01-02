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

test('it should set the right pending row class if that was empty', t => {
  const $appMethods = { isEmpty: () => true }
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } })

  wrapper.vm.selectPendingClass()
  t.is(wrapper.vm.rowClass, "yellow lighten-3")
});

test('it should call mutation for increasing number of pending tasks', t => {
  const $appMethods = { isEmpty: () => true }
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } } )
  const mutationStub = sinon.stub(wrapper.vm, "updateCounterOfPendingTasks")

  wrapper.vm.selectPendingClass()
  t.true(mutationStub.calledOnce)
  t.deepEqual(mutationStub.args[0], [1])

  mutationStub.restore()
});

test('it should not set the right pending row class if this exists', t => {
  const $appMethods = { isEmpty: () => false }
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } } )
  wrapper.vm.rowClass = "red"

  wrapper.vm.selectPendingClass()
  t.is(wrapper.vm.rowClass, "red")
});
