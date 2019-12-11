import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { serial as test } from 'ava';
import reports from '@/pages/reports'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)


const mocks = { $api: { allUsers: () => {} } }

const success_response = {
  success: () => { return true },
  data: [{ name: 'John', id: 11 }]
}

const fail_response = {
  success: () => { return false },
  errors: "errors"
}

const store = new Vuex.Store(fakeStoreData);

test("it should call method for fetching users", async t => {
  const apiStub = sinon.stub(mocks.$api, "allUsers").returns(fail_response)
  const wrapper = shallowMount(reports, { localVue, mocks, store })

  await wrapper.vm.fetchUsers()

  t.true(apiStub.calledOnce)

  apiStub.restore()
})

test("it should keep users from recieved data if request was successful", async t => {
  const apiStub = sinon.stub(mocks.$api, "allUsers").returns(success_response)
  const wrapper = shallowMount(reports, { localVue, mocks, store })

  await wrapper.vm.fetchUsers()
  t.deepEqual(wrapper.vm.users, [{ name: 'John', id: 11 }])

  apiStub.restore()
})
