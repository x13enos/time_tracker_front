import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import test from 'ava';
import bar from '@/components/days/bar'
import { DateTime } from 'luxon'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

const store = new Vuex.Store(fakeStoreData);

test('it should set interval id to component data', t => {
  const timeStub = sinon.useFakeTimers()
  const intervalStub = sinon.stub(timeStub, 'setInterval').returns(77)
  const wrapper = shallowMount(bar, { store, localVue })
  t.is(wrapper.vm.intervalId, 77)

  intervalStub.restore()
  timeStub.restore()
});
