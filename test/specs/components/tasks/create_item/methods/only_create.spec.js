import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import { serial as test } from 'ava';
import Vuex from 'vuex'
import task from '@/components/tasks/create_item'
import { DateTime } from 'luxon'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

const propsData = {
  day: DateTime.local(),
  activeDay: false
}

const store = new Vuex.Store(fakeStoreData);
const $appMethods = { isEmpty: () => {} }

test("it should not call create method if start button was focused", async t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } } )
  const methodStub = sinon.stub(wrapper.vm, "create")
  wrapper.vm.btnStartFocused = true
  await wrapper.vm.onlyCreate()
  t.false(methodStub.called)

  methodStub.restore()
});

test("it should call create method if start button wasn't focused", async t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } } )
  const methodStub = sinon.stub(wrapper.vm, "create")
  wrapper.vm.btnStartFocused = false
  await wrapper.vm.onlyCreate()
  t.true(methodStub.calledOnce)

  methodStub.restore()
});
