import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import test from 'ava';
import bar from '@/components/days/bar'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

const store = new Vuex.Store(fakeStoreData);

test('it should set interval id to component data', t => {
  const timeStub = sinon.useFakeTimers()
  const intervalStub = sinon.stub(timeStub, 'setInterval').returns(77)
  const clearIntervalStub = sinon.stub(timeStub, 'clearInterval')
  shallowMount(bar, { store, localVue }).destroy()

  t.true(clearIntervalStub.calledOnce)
  t.deepEqual(clearIntervalStub.args[0], [77])

  clearIntervalStub.restore()
  intervalStub.restore()
  timeStub.restore()
});
