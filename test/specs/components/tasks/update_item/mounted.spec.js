import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import {serial as test} from 'ava';
import task from '@/components/tasks/update_item'

const localVue = createLocalVue()
localVue.use(Vuetify)

let wrapper, updatingSpentTimeStub, startTaskStub;

const taskData = {
  id: 125,
  project: 1,
  description: "test",
  spentTime: 0.5,
  timeStart: 28218231828
}

const props = { projects: [], task: taskData }
const $appMethods = { isEmpty: (value) => { return false } }

const newData = {
  description: "new text"
}

const methods = {
  updateSpentTime: () => {},
  start: () => {}
}

test.beforeEach( t => {
  updatingSpentTimeStub = sinon.stub(methods, "updateSpentTime")
  startTaskStub = sinon.stub(methods, "start")
  const wrapper = shallowMount(task, { localVue, methods, propsData: props, mocks: { $appMethods } })
})

test.afterEach((t) => {
  updatingSpentTimeStub.restore()
  startTaskStub.restore()
})

test('it should call method for updating spent time', t => {
  t.true(updatingSpentTimeStub.calledOnce)
});

test('it should call method for starting task', t => {
  t.true(startTaskStub.calledOnce)
});
