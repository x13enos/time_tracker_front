import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import VueRouter from "vue-router"
import {serial as test} from 'ava'
import header from '@/components/layout/header'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuetify)

const router = new VueRouter()

const $api = {
  signOut: () => { return {} }
}

test('it should call api method for sign out ', async t => {
  const actionSpy = sinon.spy($api, "signOut")
  const wrapper = shallowMount(header, { localVue, router, mocks: { $api } })

  await wrapper.vm.signOut()
  t.true(actionSpy.calledOnce)

  actionSpy.restore()
});

test('it should redirect to sign in page', async t => {
  const routerStub = sinon.stub(router, "push")
  const wrapper = shallowMount(header, { localVue, router, mocks: { $api } })

  await wrapper.vm.signOut()
  t.true(routerStub.calledOnce)
  t.deepEqual(routerStub.args[0], ["/auth/sign-in"])

  routerStub.restore()
});
