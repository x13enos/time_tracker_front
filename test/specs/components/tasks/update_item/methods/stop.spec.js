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
  spentTime: '0.50'
}

const propsData = { activeDay: false, task: taskData }
const store = new Vuex.Store(fakeStoreData)
const $appMethods = { isEmpty: (value) => { return true } }

test('it should call mutation for clearing interval id', t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } } )
  const mutationStub = sinon.stub(wrapper.vm, "clearActiveTaskIntervalId")

  wrapper.vm.stop()
  t.true(mutationStub.calledOnce)

  mutationStub.restore()
});


test('it should call update method', t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } } )
  const updateStub = sinon.stub(wrapper.vm, "update")

  wrapper.vm.stop()
  t.true(updateStub.calledOnce)
  updateStub.restore()
});
