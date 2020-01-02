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

const methods = {
  weekDays: () => { return [] },
  setTheRightTab: () => {}
}

const date = DateTime.local(2019, 10, 27);

test('it should call method for selecting right tab', t => {
  const tabChooserStub = sinon.stub(methods, "setTheRightTab")
  const wrapper = shallowMount(bar, { store, localVue, methods })

  t.true(tabChooserStub.calledOnce)

  tabChooserStub.restore()
});
