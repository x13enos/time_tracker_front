import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import test from 'ava';
import task from '@/components/tasks/update_item'

const localVue = createLocalVue()
localVue.use(Vuetify)

const taskData = {
  id: 125,
  project: 1,
  description: "test",
  spentTime: 0.5
}

const props = { projects: [], task: taskData }

test('it should set active status', t => {
  const wrapper = shallowMount(task, { localVue, propsData: props } )

  wrapper.vm.unpause()
  t.true(wrapper.vm.active)
});


test('it should call method for update task info', t => {
  const wrapper = shallowMount(task, { localVue, propsData: props } )
  const updateTaskStub = sinon.stub(wrapper.vm, "update")
  wrapper.vm.unpause()
  t.true(updateTaskStub.calledOnce)
  updateTaskStub.restore()
});

test('it should call method for starting task', t => {
  const wrapper = shallowMount(task, { localVue, propsData: props } )
  const startTaskStub = sinon.stub(wrapper.vm, "start")
  wrapper.vm.unpause()
  t.true(startTaskStub.calledOnce)
  startTaskStub.restore()
});
