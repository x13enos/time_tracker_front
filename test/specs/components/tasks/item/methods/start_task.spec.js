import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import test from 'ava';
import task from '@/components/tasks/item'

const localVue = createLocalVue()
localVue.use(Vuetify)

const props = {
  projects: [],
  task: {}
}

const wrapper = shallowMount(task, { localVue, propsData: props } )

test('it should toggle "active" value', t => {
  const createTaskStub = sinon.stub(wrapper.vm, "createTask")
  wrapper.vm.active = true
  wrapper.vm.startTask()
  t.false(wrapper.vm.active)
  createTaskStub.restore()
});

test('it should launch method for creating task if it is a new object', t => {
  const createTaskStub = sinon.stub(wrapper.vm, "createTask")
  wrapper.vm.startTask()
  t.true(createTaskStub.calledOnce)
  createTaskStub.restore()
});

test('it should launch method for updating task if it existed object', t => {
  props.task.id = 1
  const wrapper = shallowMount(task, { localVue, propsData: props } )
  const updateTaskStub = sinon.stub(wrapper.vm, "updateTask")
  wrapper.vm.startTask()
  t.true(updateTaskStub.calledOnce)
  updateTaskStub.restore()
});
