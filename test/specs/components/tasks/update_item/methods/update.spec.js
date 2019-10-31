import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import test from 'ava';
import Vuex from 'vuex'
import task from '@/components/tasks/update_item'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

const props = { projects: [] }
const store = new Vuex.Store(fakeStoreData)
const $appMethods = { isEmpty: () => {} }

test('it should emit form data', t => {
  const wrapper = shallowMount(task, { localVue, store, propsData: props, mocks: { $appMethods } })
  const paramsStub = sinon.stub(wrapper.vm, 'formData').returns({ description: "text" })

  wrapper.vm.update()
  t.deepEqual(wrapper.emitted("updateTask"), [[{ description: "text" }]])

  paramsStub.restore()
});
