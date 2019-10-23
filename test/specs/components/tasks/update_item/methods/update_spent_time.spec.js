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
  spentTime: 0.5,
  timeStart: 1550373600
}

const props = { projects: [], task: taskData }

test('it should emit form data', t => {
  const clock = sinon.useFakeTimers(new Date(Date.UTC(2019, 1, 17, 3, 25)));
  const wrapper = shallowMount(task, { localVue, propsData: props })
  wrapper.vm.spentTime = 0.5
  wrapper.vm.updateSpentTime()
  t.is(wrapper.vm.spentTime, '0.58')

  clock.restore()
});
