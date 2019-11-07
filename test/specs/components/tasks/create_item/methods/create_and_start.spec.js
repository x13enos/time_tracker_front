import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import { serial as test } from 'ava';
import Vuex from 'vuex'
import task from '@/components/tasks/create_item'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

const propsData = { activeDay: false }
const store = new Vuex.Store(fakeStoreData);
const $appMethods = { isEmpty: () => {} }

test('it should set active status', t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } } )

  wrapper.vm.createAndStart()
  t.true(wrapper.vm.active)
});

test('it should clean form data', async t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } } )
  const methodStub = sinon.stub(wrapper.vm, "create")
  await wrapper.vm.createAndStart()
  t.true(methodStub.calledOnce)
  methodStub.restore()
});
