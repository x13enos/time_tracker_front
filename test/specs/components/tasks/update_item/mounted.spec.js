import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import {serial as test} from 'ava';
import Vuex from 'vuex'
import task from '@/components/tasks/update_item'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

let wrapper, updatingSpentTimeStub, startTaskStub;

const taskData = {
  id: 125,
  project: 1,
  description: "test",
  spentTime: 0.5,
  timeStart: 28218231828
}

const propsData = { activeDay: false, task: taskData }
const store = new Vuex.Store(fakeStoreData);
const $appMethods = { isEmpty: (value) => { return false } }

const newData = {
  description: "new text"
}

const methods = { start: () => {} }

test('it should call method for starting task', t => {
  startTaskStub = sinon.stub(methods, "start")
  const wrapper = shallowMount(task, { localVue, store, methods, propsData, mocks: { $appMethods } })

  t.true(startTaskStub.calledOnce)

  startTaskStub.restore()
});
