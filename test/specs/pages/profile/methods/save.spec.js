import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import test from 'ava';
import profile from '@/pages/profile'

const localVue = createLocalVue()
localVue.use(Vuex);
localVue.use(Vuetify)

const store = new Vuex.Store(fakeStoreData);
const successResponse = { success: () => { return true } }

test("it should call method for updating user profile", t => {
  const wrapper = shallowMount(profile, { localVue, store })
  const updateStub = sinon.stub(wrapper.vm, "updateUserProfile").returns(successResponse)

  wrapper.vm.save()

  t.true(updateStub.calledOnce)
  t.deepEqual(updateStub.args[0], [wrapper.vm.form])

  updateStub.restore()
})

test("it should clean up password field after updating", async t => {
  const wrapper = shallowMount(profile, { localVue, store })
  const updateStub = sinon.stub(wrapper.vm, "updateUserProfile").returns(successResponse)
  wrapper.vm.form.pasword = "11111111"
  await wrapper.vm.save()

  t.is(wrapper.vm.form.password, "")

  updateStub.restore()
})

test("it should show notitication for user if profile was updated", async t => {
  const wrapper = shallowMount(profile, { localVue, store })
  const snackSpy = sinon.spy(wrapper.vm, "updateSnack")
  const updateStub = sinon.stub(wrapper.vm, "updateUserProfile").returns(successResponse)

  await wrapper.vm.save()
  t.true(snackSpy.calledOnce)
  t.deepEqual(snackSpy.args[0], [{ message: "Profile was updated succesfully.", color: "green" }])

  updateStub.restore()
  snackSpy.restore()
})

test("it should not show notitication for user if profile wasn't updated", async t => {
  const failResponse = { success: () => { return false } }
  const wrapper = shallowMount(profile, { localVue, store })
  const snackSpy = sinon.spy(wrapper.vm, "updateSnack")
  const updateStub = sinon.stub(wrapper.vm, "updateUserProfile").returns(failResponse)

  await wrapper.vm.save()
  t.false(snackSpy.called)

  updateStub.restore()
  snackSpy.restore()
})
