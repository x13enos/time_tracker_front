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

test('it should change dialog flag', t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } } )

  wrapper.vm.deleteItem()
  t.false(wrapper.vm.dialog)
});


test('it should call action for deleting time record', t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } } )
  const actionStub = sinon.stub(wrapper.vm, 'deleteTask')
  wrapper.vm.deleteItem()

  t.true(actionStub.calledOnce)
  t.deepEqual(actionStub.args[0], [125])

  actionStub.restore()
});
