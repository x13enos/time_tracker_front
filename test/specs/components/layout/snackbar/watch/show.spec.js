import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import test from 'ava'
import Vuex from 'vuex'
import snackbar from '@/components/layout/snackbar'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

const store = new Vuex.Store(fakeStoreData);

test('it should call mutation for cleaning snack info is show is false', t => {
  const wrapper = shallowMount(snackbar, { localVue, store })
  const mutationSpy = sinon.spy(wrapper.vm, "updateSnack")
  wrapper.vm.show = true

  wrapper.vm.show = false
  t.true(mutationSpy.calledOnce)
  t.deepEqual(mutationSpy.args[0], [{
    message: "",
    color: ""
  }])

  mutationSpy.restore()
});

test('it should not call mutation for cleaning snack info is show is true', t => {
  const wrapper = shallowMount(snackbar, { localVue, store })
  wrapper.vm.show = false
  const mutationSpy = sinon.spy(wrapper.vm, "updateSnack")

  wrapper.vm.show = true
  t.false(mutationSpy.called)

  mutationSpy.restore()
});
