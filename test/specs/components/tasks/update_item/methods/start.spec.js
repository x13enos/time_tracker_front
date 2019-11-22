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

test('it should call mutation keepActiveTaskIntervalId', t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } } )
  const mutationStub = sinon.stub(wrapper.vm, "keepActiveTaskIntervalId")
  const timer = sinon.useFakeTimers()
  const intervalStub = sinon.stub(timer, 'setInterval').returns(101)

  wrapper.vm.start()
  t.true(mutationStub.calledOnce)
  t.deepEqual(mutationStub.args[0], [101])

  timer.restore()
  intervalStub.restore()
  mutationStub.restore()
});

test('it should change spent time on 0.01 each 36 seconds', t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } } )
  const clock = sinon.useFakeTimers();

  wrapper.vm.start()
  clock.tick(37000);

  t.is(wrapper.vm.spentTime, '0.51')

  clock.restore();
});

test('it should pass updated time to parent each 36 seconds', t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } } )
  const mutationStub = sinon.stub(wrapper.vm, "updateTaskSpentTime")
  const clock = sinon.useFakeTimers();

  wrapper.vm.start()
  clock.tick(37000);

  t.true(mutationStub.calledOnce)
  t.deepEqual(mutationStub.args[0], [{ spentTime: 0.51, id: 125 }])

  clock.restore();
  mutationStub.restore();
});

test('it should not change spent time on 0.01 each 35 seconds', t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } } )
  const clock = sinon.useFakeTimers();

  wrapper.vm.start()
  clock.tick(35000);

  t.is(wrapper.vm.spentTime, '0.50')

  clock.restore();
});
