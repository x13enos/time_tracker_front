import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import test from 'ava';
import Vuex from 'vuex'
import task from '@/components/tasks/update_item'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

const propsData = { activeDay: false, task: {} }
const store = new Vuex.Store(fakeStoreData)

test('it should set the right pending row class if that was empty', t => {
  const $appMethods = { isEmpty: () => { return true } }
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } } )

  wrapper.vm.selectPendingClass()
  t.is(wrapper.vm.rowClass, "yellow lighten-3")
});

test('it should call mutation for increasing number of pending tasks', t => {
  const $appMethods = { isEmpty: () => { return true } }
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } } )
  const mutationStub = sinon.stub(wrapper.vm, "updateCounterOfPendingTasks")

  wrapper.vm.selectPendingClass()
  t.true(mutationStub.calledOnce)
  t.deepEqual(mutationStub.args[0], [1])

  mutationStub.restore()
});

test('it should not set the right pending row class if this exists', t => {
  const $appMethods = { isEmpty: () => { return false } }
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } } )
  wrapper.vm.rowClass = "red"

  wrapper.vm.selectPendingClass()
  t.is(wrapper.vm.rowClass, "red")
});
