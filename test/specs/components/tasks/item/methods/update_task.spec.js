import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import { serial as test } from 'ava';
import task from '@/components/tasks/item'

const localVue = createLocalVue()
localVue.use(Vuetify)

const $api = {
  updateTimeRecord: () => {}
}

let actionSpy, wrapper

test.beforeEach(t => {
  actionSpy = sinon.spy($api, "updateTimeRecord")
  const props = { projects: [], task: { id: 1 } }
  wrapper = shallowMount(task, { localVue, mocks: { $api }, propsData: props })
})

test.afterEach(t => {
  actionSpy.restore()
})

test('it should call api method for creating task', t => {
  wrapper.vm.updateTask()
  t.true(actionSpy.calledOnce)
});

test('it should passed params to request', t => {
  const paramsStub = sinon.stub(wrapper.vm, 'formData').returns({ project: "11" })

  wrapper.vm.updateTask()
  t.deepEqual(actionSpy.args[0], [{ id: 1, project: '11' }])
  paramsStub.restore()
});

test('it should emit method "updateInfo"', async t => {
  const paramsStub = sinon.stub(wrapper.vm, 'formData').returns({id: null})

  await wrapper.vm.updateTask()
  t.is(wrapper.emitted("updateInfo").length, 1)

  paramsStub.restore()
});

test('it should pass updated params to the emitted action', async t => {
  const paramsStub = sinon.stub(wrapper.vm, 'formData').returns({ project: "11" })

  await wrapper.vm.updateTask()
  t.deepEqual(wrapper.emitted("updateInfo"), [[{ project: "11" }]])

  paramsStub.restore()
});
