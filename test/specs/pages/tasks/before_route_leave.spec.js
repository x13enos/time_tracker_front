import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from "vue-router"
import Vuetify from 'vuetify'
import {serial as test} from 'ava';
import tasks from '@/pages/tasks'

const localVue = createLocalVue()
localVue.use(Vuex);
localVue.use(VueRouter)
localVue.use(Vuetify)

const store = new Vuex.Store(fakeStoreData);
const router = new VueRouter()

test.only('it should call action for checking on pending tasks', t => {
  const wrapper = shallowMount(tasks, { localVue, router, store })
  const actionStub = sinon.stub(wrapper.vm, "checkOnPendingTasks")
  const next = sinon.stub

  tasks.beforeRouteLeave.call(wrapper.vm, undefined, undefined, next)
  t.true(actionStub.calledOnce)

  actionStub.restore()
})
