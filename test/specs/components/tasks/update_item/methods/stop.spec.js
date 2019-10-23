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
  spentTime: '0.50'
}

const props = { projects: [], task: taskData }

test('it should clear interval', t => {
  const wrapper = shallowMount(task, { localVue, propsData: props } )
  const clock = sinon.useFakeTimers();
  const clockSpy = sinon.spy(clock, "clearInterval")
  wrapper.vm.stop()

  t.true(clockSpy.calledOnce)
  t.deepEqual(clockSpy.args[0], [wrapper.vm.intervalId])
  clock.restore();
});

test('it should set inactive status', t => {
  const wrapper = shallowMount(task, { localVue, propsData: props } )
  wrapper.vm.active = true

  wrapper.vm.stop()
  t.false(wrapper.vm.active)
});

test('it should call update method', t => {
  const wrapper = shallowMount(task, { localVue, propsData: props } )
  const updateStub = sinon.stub(wrapper.vm, "update")

  wrapper.vm.stop()
  t.true(updateStub.calledOnce)
  updateStub.restore()
});
