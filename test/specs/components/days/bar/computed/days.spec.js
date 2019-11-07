import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import test from 'ava';
import bar from '@/components/days/bar'

const localVue = createLocalVue()
localVue.use(Vuetify)

const date = new Date('Sun Oct 27 2019 00:00:00 GMT+0000');

const methods = {
  weekDays: (value) => { return [date] },
  getFormattedDateForWeek: (value) => { return "" }
}

test('it should call method for selecting days of week', t => {
  const methodStub = sinon.stub(methods, "weekDays").returns([date])
  const wrapper = shallowMount(bar, { localVue, methods })

  t.true(methodStub.calledOnce)

  methodStub.restore()
});

test('it should return days of week', t => {
  const wrapper = shallowMount(bar, { localVue, methods })

  t.deepEqual(wrapper.vm.days, [date])
});
