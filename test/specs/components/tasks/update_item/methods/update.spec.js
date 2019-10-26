import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import test from 'ava';
import task from '@/components/tasks/update_item'

const localVue = createLocalVue()
localVue.use(Vuetify)

const props = { projects: [] }
const $appMethods = { isEmpty: () => {} }

test('it should emit form data', t => {
  const wrapper = shallowMount(task, { localVue, propsData: props, mocks: { $appMethods } })
  const paramsStub = sinon.stub(wrapper.vm, 'formData').returns({ description: "text" })

  wrapper.vm.update()
  t.deepEqual(wrapper.emitted("updateTask"), [[{ description: "text" }]])

  paramsStub.restore()
});
