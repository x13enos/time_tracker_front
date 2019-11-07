import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import test from 'ava'
import task from '@/components/tasks/update_item'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

const store = new Vuex.Store(fakeStoreData);
const propsData = {
  task: { timeStart: 'now' },
  activeDay: false
}

test('it should call method isEmpty and passed timeStart argument', t => {
  const $appMethods = { isEmpty: (value) => { return true } }
  const isEmptyStub = sinon.stub($appMethods, 'isEmpty')

  const wrapper = shallowMount(task, { localVue, store, mocks: { $appMethods }, propsData } )
  t.true(isEmptyStub.calledOnce)
  t.deepEqual(isEmptyStub.args[0], ['now'])

  isEmptyStub.restore()
});

test('it should return true if passed timeStart is not empty', t => {
  const $appMethods = { isEmpty: (value) => { return false } }

  const wrapper = shallowMount(task, { localVue, store, mocks: { $appMethods }, propsData } )
  t.true(wrapper.vm.active)
});

test('it should return false if passed timeStart is empty', t => {
  const $appMethods = { isEmpty: (value) => { return true } }

  const wrapper = shallowMount(task, { localVue, store, mocks: { $appMethods }, propsData } )
  t.false(wrapper.vm.active)
});
