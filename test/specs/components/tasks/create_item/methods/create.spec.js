import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import { serial as test } from 'ava';
import Vuex from 'vuex'
import task from '@/components/tasks/create_item'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

const day = new Date()

const propsData = { activeDay: false, day }
const store = new Vuex.Store(fakeStoreData);
const $appMethods = { isEmpty: () => {} }

test('it should call action addTack', t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } })
  const actionStub = sinon.stub(wrapper.vm, "addTask")
  const paramsStub = sinon.stub(wrapper.vm, 'formData').returns({ description: "text" })

  wrapper.vm.create()
  t.true(actionStub.calledOnce)
  t.deepEqual(actionStub.args[0], [
    { params: { description: "text" }, day }
  ])

  paramsStub.restore()
});

test('it should clean form data', async t => {
  const wrapper = shallowMount(task, { localVue, store, propsData, mocks: { $appMethods } })
  wrapper.vm.description = "new text"
  await wrapper.vm.create()
  t.is(wrapper.vm.description, null)
});
