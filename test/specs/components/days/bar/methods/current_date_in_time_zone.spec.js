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

test("it should use user's timezone", async t => {
  store.state.user.timezone = "Europe/Kiev"
  const date = DateTime.local()
  const dateTimeStub = sinon.stub(DateTime, 'fromObject').returns(date)
  const wrapper = await shallowMount(bar, { store, localVue })

  t.true(dateTimeStub.called)
  t.deepEqual(dateTimeStub.args[0], [{ zone: "Europe/Kiev" }])
  dateTimeStub.restore()
});
