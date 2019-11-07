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

test('it should emit interval id', t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } } )
  const timer = sinon.useFakeTimers()
  const intervalStub = sinon.stub(timer, 'setInterval').returns(101)

  wrapper.vm.start()
  t.deepEqual(wrapper.emitted('keepIntervalId')[0], [101])

  timer.restore()
  intervalStub.restore()
});

test('it should change spent time on 0.01 each 36 seconds', t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } } )
  const clock = sinon.useFakeTimers();

  wrapper.vm.start()
  clock.tick(37000);

  t.is(wrapper.vm.spentTime, '0.51')

  clock.restore();
});

test('it should not change spent time on 0.01 each 35 seconds', t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } } )
  const clock = sinon.useFakeTimers();

  wrapper.vm.start()
  clock.tick(35000);

  t.is(wrapper.vm.spentTime, '0.50')

  clock.restore();
});
