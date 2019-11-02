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
  success: () => { return true },
  data: {
    token: "123"
  }
}

global.localStorage = localStorageMock

test('it should call action with filled data', async t => {
  const $api = {
    signIn: () => { return successResponse }
  }

  const actionSpy = sinon.spy($api, "signIn")
  const wrapper = shallowMount(signIn, { localVue, store, router, mocks: { $api } })
  Object.assign(wrapper.vm, { form: { email: 'example@gmail.com', password: '11111111' } })
  await wrapper.vm.onSubmit()
  t.true(actionSpy.calledOnce)
  t.deepEqual(actionSpy.args[0], [{ email: 'example@gmail.com', password: '11111111' }])
  actionSpy.restore()
});

test('it should write token to the local storage', async t => {
  const $api = {
    signIn: () => { return successResponse }
  }

  const localStorageStub = sinon.stub(localStorageMock, "setItem")
  const wrapper = shallowMount(signIn, { localVue, store, router, mocks: { $api } })

  await wrapper.vm.onSubmit()
  t.deepEqual(localStorageStub.args[1], ['authToken', '123'])
  localStorageStub.restore()
});

test('it should redirect user to main page if status is success', async t => {
  const $api = {
    signIn: () => { return successResponse }
  }

  const routerStub = sinon.stub(router, 'replace')
  const wrapper = shallowMount(signIn, { localVue, store, router, mocks: { $api } })

  await wrapper.vm.onSubmit()
  t.true(routerStub.calledOnce)
  t.deepEqual(routerStub.args[0], [{ path: '/tasks' }])
  routerStub.restore()
});

test('it should write errors from response to variable if status is "fail"', async t => {
  const failResponse = {
    success: () => { return false },
    errors: "ERROR!!!"
  }

  const $api = {
    signIn: () => { return failResponse }
  }

  const wrapper = shallowMount(signIn, { localVue, store, router, mocks: { $api } })

  await wrapper.vm.onSubmit()
  t.is(wrapper.vm.errorMessage, "ERROR!!!")
});
