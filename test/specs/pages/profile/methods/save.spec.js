import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import test from 'ava';
import profile from '@/pages/profile'

const localVue = createLocalVue()
localVue.use(Vuex);
localVue.use(Vuetify)

const store = new Vuex.Store(fakeStoreData);

test("it should call method for updating user profile", t => {
  const wrapper = shallowMount(profile, { localVue, store })
  const updateStub = sinon.stub(wrapper.vm, "updateUserProfile")

  wrapper.vm.save()

  t.true(updateStub.calledOnce)
  t.deepEqual(updateStub.args[0], [wrapper.vm.form])

  updateStub.restore()
})
