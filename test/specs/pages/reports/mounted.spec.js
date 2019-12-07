import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import test from 'ava';
import reports from '@/pages/reports'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

const store = new Vuex.Store(fakeStoreData);

test("it should set user id from store", async t => {
  store.state.user.id = "Vx2f9sdf"
  const wrapper = shallowMount(reports, { localVue, store })

  t.is(wrapper.vm.filters.userId, "Vx2f9sdf")
})

test("it should call method for fetching users if user is admin", async t => {
  store.getters = {
    isAdmin: true
  }

  const methods = { fetchUsers: () => {} }
  const methodStub = sinon.stub(methods, 'fetchUsers')
  shallowMount(reports, { localVue, store, methods })

  t.true(methodStub.calledOnce)

  methodStub.restore()
})

test("it should not call method for fetching users if user isn't admin", async t => {
  store.getters = {
    isAdmin: false
  }

  const methods = {
    fetchUsers: () => {}
  }
  const methodStub = sinon.stub(methods, 'fetchUsers')
  shallowMount(reports, { localVue, store, methods })

  t.false(methodStub.calledOnce)

  methodStub.restore()
})
