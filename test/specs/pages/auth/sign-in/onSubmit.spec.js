import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from "vue-router"
import Vuetify from 'vuetify'
import { localStorageMock } from '@/test/support/local_storage_mock'
import {serial as test} from 'ava';
import signIn from '@/pages/auth/sign-in'

const localVue = createLocalVue()
localVue.use(Vuex);
localVue.use(VueRouter)
localVue.use(Vuetify)

const store = new Vuex.Store(fakeStoreData);
const router = new VueRouter()

const successResponse = {
  status: "success",
  data: {
    token: "123"
  }
}

const failResponse = {
  status: "fail",
  errors: "ERROR!!!"
}

test('it should call action with filled data', async t => {
  global.localStorage = localStorageMock
  const actionStub = sinon.stub(store, "dispatch").resolves(successResponse)
  const wrapper = shallowMount(signIn, { localVue, store, router })
  Object.assign(wrapper.vm, { form: { email: 'example@gmail.com', password: '11111111' } })
  await wrapper.vm.onSubmit()
  t.true(actionStub.calledOnce)
  t.deepEqual(actionStub.args[0], ['signIn', { email: 'example@gmail.com', password: '11111111' }])
  actionStub.restore()
});

test('it should write token to the local storage', async t => {
  global.localStorage = localStorageMock
  const localStorageStub = sinon.stub(localStorageMock, "setItem")
  const actionStub = sinon.stub(store, "dispatch").resolves(successResponse)
  const wrapper = shallowMount(signIn, { localVue, store, router })

  await wrapper.vm.onSubmit()
  t.true(localStorageStub.calledOnce)
  t.deepEqual(localStorageStub.args[0], ['authToken', '123'])
  actionStub.restore()
  localStorageStub.restore()
});

test('it should redirect user to main page if status is success', async t => {
  const routerStub = sinon.stub(router, 'replace')
  const actionStub = sinon.stub(store, "dispatch").resolves(successResponse)
  const wrapper = shallowMount(signIn, { localVue, store, router })

  await wrapper.vm.onSubmit()
  t.true(routerStub.calledOnce)
  t.deepEqual(routerStub.args[0], [{ path: '/' }])
  actionStub.restore()
  routerStub.restore()
});

test('it should write errors from response to variable if status is "fail"', async t => {
  const actionStub = sinon.stub(store, "dispatch").resolves(failResponse)
  const wrapper = shallowMount(signIn, { localVue, store, router })

  await wrapper.vm.onSubmit()
  t.is(wrapper.vm.errorMessage, "ERROR!!!")
  actionStub.restore()
});
