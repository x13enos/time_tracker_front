import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import { serial as test } from 'ava';
import task from '@/components/tasks/create_item'

const localVue = createLocalVue()
localVue.use(Vuetify)

const props = { projects: [] }

test('it should set active status', t => {
  const wrapper = shallowMount(task, { localVue, propsData: props })

  wrapper.vm.createAndStart()
  t.true(wrapper.vm.active)
});

test('it should clean form data', async t => {
  const wrapper = shallowMount(task, { localVue, propsData: props })
  const methodStub = sinon.stub(wrapper.vm, "create")
  await wrapper.vm.createAndStart()
  t.true(methodStub.calledOnce)
  methodStub.restore()
});
