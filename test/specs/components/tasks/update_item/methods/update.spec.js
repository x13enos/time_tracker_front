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
  const actionStub = sinon.stub(wrapper.vm, 'updateTask')

  wrapper.vm.update()
  t.true(actionStub.calledOnce)
  t.deepEqual(actionStub.args[0], [{
    description: "text",
    active: false
   }])

  actionStub.restore()
  paramsStub.restore()
});

test('it should call action updateTask and form data should have active status as true', t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } })
  const paramsStub = sinon.stub(wrapper.vm, 'formData').returns({ description: "text" })
  const actionStub = sinon.stub(wrapper.vm, 'updateTask')

  wrapper.vm.update(true)
  t.true(actionStub.calledOnce)
  t.deepEqual(actionStub.args[0], [{
    description: "text",
    active: true
  }])

  actionStub.restore()
  paramsStub.restore()
});

test('it should remove pending row class after', async t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } })

  await wrapper.vm.update(true)
  t.is(wrapper.vm.pendingClass, "")
});
