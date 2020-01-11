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

test('it should not call action updateTask if validation was failed', t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } })
  const actionStub = sinon.stub(wrapper.vm, 'updateTask').returns({ success: () => { return true } })
  wrapper.vm.valid = false
  
  wrapper.vm.update(true)
  t.false(actionStub.called)

  actionStub.restore()
});

test('it should call action updateTask and form data should have active status as true', t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } })
  const paramsStub = sinon.stub(wrapper.vm, 'formData').returns({ description: "text" })
  const actionStub = sinon.stub(wrapper.vm, 'updateTask').returns({ success: () => { return true } })

  wrapper.vm.update(true)
  t.true(actionStub.calledOnce)
  t.deepEqual(actionStub.args[0], [{
    description: "text",
    active: true
  }])

  actionStub.restore()
  paramsStub.restore()
});

test('it should remove pending row class if request was successful', async t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } })
  const actionStub = sinon.stub(wrapper.vm, 'updateTask').returns({ success: () => { return true } })

  await wrapper.vm.update(true)
  t.is(wrapper.vm.rowClass, "")
  actionStub.restore()
});

test('it should decrease number of pending tasks if request was successful', async t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } })
  const actionStub = sinon.stub(wrapper.vm, 'updateTask').returns({ success: () => { return true } })
  const mutationStub = sinon.stub(wrapper.vm, "updateCounterOfPendingTasks")

  await wrapper.vm.update(true)
  t.true(mutationStub.calledOnce)
  t.deepEqual(mutationStub.args[0], [-1])

  actionStub.restore()
  mutationStub.restore()
});

test('it should update snack data with passed errors', async t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } })
  const actionStub = sinon.stub(wrapper.vm, "updateTask").returns({
    success: () => { return false },
    errors: "Big message of errors"
  })
  const mutationStub = sinon.stub(wrapper.vm, "updateSnack")

  await wrapper.vm.update()
  t.true(mutationStub.calledOnce)
  t.deepEqual(mutationStub.args[0], [{
    message: "Big message of errors",
    color: "red"
  }])

  actionStub.restore()
  mutationStub.restore()
});

test('it should change pending row class to red if request was failed', async t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } })
  const actionStub = sinon.stub(wrapper.vm, 'updateTask').returns({ success: () => { return false } })

  await wrapper.vm.update(true)
  t.is(wrapper.vm.rowClass, "red")

  actionStub.restore()
});
