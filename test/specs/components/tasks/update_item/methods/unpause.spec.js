import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import test from 'ava';
import Vuex from 'vuex'
import task from '@/components/tasks/update_item'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

const taskData = {
  id: 125,
  project: 1,
  description: "test",
  spentTime: 0.5
}

const propsData = { activeDay: false, task: taskData }
const store = new Vuex.Store(fakeStoreData)
const $appMethods = { isEmpty: (value) => { return true } }

test('it should call method for update task info', t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } } )
  const updateTaskStub = sinon.stub(wrapper.vm, "update")
  wrapper.vm.unpause()
  t.true(updateTaskStub.calledOnce)
  t.true(updateTaskStub.args[0][0])
  updateTaskStub.restore()
});

test('it should call method for starting task', t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } } )
  const startTaskStub = sinon.stub(wrapper.vm, "start")
  wrapper.vm.unpause()
  t.true(startTaskStub.calledOnce)
  startTaskStub.restore()
});
