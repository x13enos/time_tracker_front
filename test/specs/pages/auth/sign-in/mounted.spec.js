import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import { localStorageMock } from '@/test/support/local_storage_mock'
import test from 'ava';
import signIn from '@/pages/auth/sign-in'

const localVue = createLocalVue()
localVue.use(Vuetify)

global.localStorage = localStorageMock

test('it should clean up the localStorage', t => {
  const localStorageSpy = sinon.spy(localStorageMock, "setItem")
  const wrapper = shallowMount(signIn, { localVue })
  t.true(localStorageSpy.calledOnce)
  t.deepEqual(localStorageSpy.args[0], ['authToken', undefined])
  localStorageSpy.restore()
});
