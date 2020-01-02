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
const date = DateTime.local(2019, 10, 27);

const methods = {
  weekDays: (value) => { return [date] },
  getFormattedDateForWeek: (value) => { return "" }
}

test('it should call method for selecting days of week', t => {
  const methodStub = sinon.stub(methods, "weekDays").returns([date])
  const wrapper = shallowMount(bar, { store, localVue, methods })

  t.true(methodStub.calledOnce)

  methodStub.restore()
});

test('it should return days of week', t => {
  const wrapper = shallowMount(bar, { store, localVue, methods })

  t.deepEqual(wrapper.vm.days, [date])
});
