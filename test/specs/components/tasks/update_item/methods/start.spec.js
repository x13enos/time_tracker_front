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
const $appMethods = { isEmpty: (value) => { return true } }

test('it should set internal id', t => {
  const wrapper = shallowMount(task, { localVue, propsData: props, mocks: { $appMethods } } )

  wrapper.vm.start()
  t.true(wrapper.vm.intervalId != null)
});

test('it should change spent time on 0.01 each 36 seconds', t => {
  const wrapper = shallowMount(task, { localVue, propsData: props, mocks: { $appMethods } } )
  const clock = sinon.useFakeTimers();

  wrapper.vm.start()
  clock.tick(37000);

  t.is(wrapper.vm.spentTime, '0.51')

  clock.restore();
});

test('it should not change spent time on 0.01 each 35 seconds', t => {
  const wrapper = shallowMount(task, { localVue, propsData: props, mocks: { $appMethods } } )
  const clock = sinon.useFakeTimers();

  wrapper.vm.start()
  clock.tick(35000);

  t.is(wrapper.vm.spentTime, '0.50')

  clock.restore();
});
