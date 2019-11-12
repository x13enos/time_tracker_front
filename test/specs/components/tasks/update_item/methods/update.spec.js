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

test('it should emit form data with active status as false', t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } })
  const paramsStub = sinon.stub(wrapper.vm, 'formData').returns({ description: "text" })

  wrapper.vm.update()
  t.deepEqual(wrapper.emitted("updateTask"), [[{
    description: "text",
    active: false
   }]])

  paramsStub.restore()
});

test('it should emit form data with active status as true', t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } })
  const paramsStub = sinon.stub(wrapper.vm, 'formData').returns({ description: "text" })

  wrapper.vm.update(true)
  t.deepEqual(wrapper.emitted("updateTask"), [[{
    description: "text",
    active: true
   }]])

  paramsStub.restore()
});

test('it should remove pending row class after', async t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } })

  await wrapper.vm.update(true)
  t.is(wrapper.vm.pendingClass, "")
});
