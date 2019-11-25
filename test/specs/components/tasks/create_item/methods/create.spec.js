import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import { serial as test } from 'ava';
import Vuex from 'vuex'
import task from '@/components/tasks/create_item'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

const day = new Date()

const propsData = { activeDay: false, day }
const store = new Vuex.Store(fakeStoreData);
const $appMethods = { isEmpty: () => {} }

test('it should call action addTack', t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } })
  const actionStub = sinon.stub(wrapper.vm, "addTask").returns({ success: () => { return true } })
  const paramsStub = sinon.stub(wrapper.vm, 'formData').returns({ description: "text" })

  wrapper.vm.create()
  t.true(actionStub.calledOnce)
  t.deepEqual(actionStub.args[0], [
    { params: { description: "text" }, day }
  ])

  actionStub.restore()
  paramsStub.restore()
});

test('it should clean form data if request was successful', async t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } })
  const actionStub = sinon.stub(wrapper.vm, "addTask").returns({ success: () => { return true } })
  wrapper.vm.description = "new text"

  await wrapper.vm.create()
  t.is(wrapper.vm.description, null)

  actionStub.restore()
});

test('it should decrease number of pending tasks if request was successful', async t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } })
  const actionStub = sinon.stub(wrapper.vm, "addTask").returns({ success: () => { return true } })
  const mutationStub = sinon.stub(wrapper.vm, "updateCounterOfPendingTasks")

  await wrapper.vm.create()
  t.true(mutationStub.calledOnce)
  t.deepEqual(mutationStub.args[0], [-1])

  actionStub.restore()
  mutationStub.restore()
});

test('it should update snack data with passed errors', async t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } })
  const actionStub = sinon.stub(wrapper.vm, "addTask").returns({
    success: () => { return false },
    errors: "Big message of errors"
  })
  const mutationStub = sinon.stub(wrapper.vm, "updateSnack")

  await wrapper.vm.create()
  t.true(mutationStub.calledOnce)
  t.deepEqual(mutationStub.args[0], [{
    message: "Big message of errors",
    color: "red"
  }])

  actionStub.restore()
  mutationStub.restore()
});

test('it should update row color class', async t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } })
  const actionStub = sinon.stub(wrapper.vm, "addTask").returns({ success: () => { return false } })

  await wrapper.vm.create()
  t.is(wrapper.vm.rowClass, 'red')

  actionStub.restore()
});
