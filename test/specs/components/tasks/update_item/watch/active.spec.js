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
  task: { timeStart: null },
  activeDay: false
}

const $appMethods = { isEmpty: (value) => { return value == null } }

test('it should call "start" method if value is true', async t => {
  const wrapper = shallowMount(task, { localVue, store, mocks: { $appMethods }, propsData } )
  const startMethodStub = sinon.stub(wrapper.vm, "start")

  await wrapper.setProps({ task: { timeStart: new Date } })

  t.true(startMethodStub.calledOnce)

  startMethodStub.restore()
});

test('it should not call "start" method if value is false', async t => {
  const wrapper = shallowMount(task, { localVue, store, mocks: { $appMethods }, propsData } )
  const startMethodStub = sinon.stub(wrapper.vm, "start")

  await wrapper.setProps({ task: { timeStart: null } })

  t.false(startMethodStub.called)

  startMethodStub.restore()
});
