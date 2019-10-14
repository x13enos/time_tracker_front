import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import { serial as test } from 'ava';
import task from '@/components/tasks/create_item'

const localVue = createLocalVue()
localVue.use(Vuetify)

const props = { projects: [] }

test('it should emit form data', t => {
  const wrapper = shallowMount(task, { localVue, propsData: props })
  const paramsStub = sinon.stub(wrapper.vm, 'formData').returns({ description: "text" })

  wrapper.vm.create()
  t.deepEqual(wrapper.emitted("addTask"), [[{ description: "text" }]])

  paramsStub.restore()
});

test('it should clean form data', async t => {
  const wrapper = shallowMount(task, { localVue, propsData: props })
  wrapper.vm.description = "new text"
  await wrapper.vm.create()
  t.is(wrapper.vm.description, null)
});
