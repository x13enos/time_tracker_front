import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import { serial as test } from 'ava';
import task from '@/components/tasks/item'

const localVue = createLocalVue()
localVue.use(Vuetify)

const props = {
  projects: [],
  task: {}
}

const $api = {
  createTimeRecord: () => { return { data: { timeRecord: { id: 100 } } } }
}

test('it should call api method for creating task', t => {
  const actionSpy = sinon.spy($api, "createTimeRecord")
  const wrapper = shallowMount(task, { localVue, mocks: { $api }, propsData: props })

  wrapper.vm.createTask()
  t.true(actionSpy.calledOnce)
  actionSpy.restore()
});

test('it should passed params to request', t => {
  const actionSpy = sinon.spy($api, "createTimeRecord")
  const wrapper = shallowMount(task, { localVue, mocks: { $api }, propsData: props })
  const paramsStub = sinon.stub(wrapper.vm, 'formData').returns({id: null})

  wrapper.vm.createTask()
  t.deepEqual(actionSpy.args[0], [{ id: null }])
  paramsStub.restore()
  actionSpy.restore()
});

test('it should emit option', async t => {
  const wrapper = shallowMount(task, { localVue, mocks: { $api }, propsData: props })
  const paramsStub = sinon.stub(wrapper.vm, 'formData').returns({id: null})

  await wrapper.vm.createTask()
  t.is(wrapper.emitted("updateInfo").length, 1)

  paramsStub.restore()
});

test('it should pass updated params to the emitted action', async t => {
  const wrapper = shallowMount(task, { localVue, mocks: { $api }, propsData: props })
  const paramsStub = sinon.stub(wrapper.vm, 'formData').returns({id: null})

  await wrapper.vm.createTask()
  t.deepEqual(wrapper.emitted("updateInfo"), [[{ id: 100 }]])

  paramsStub.restore()
});
