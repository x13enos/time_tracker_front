import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import test from 'ava';
import bar from '@/components/days/bar'

const localVue = createLocalVue()
localVue.use(Vuetify)

const date = new Date('Sun Oct 27 2019 00:00:00 GMT+0000');

test('it should call method for selecting days of week', t => {
  const wrapper = shallowMount(bar, { localVue })
  const methodStub = sinon.stub(wrapper.vm, "weekDays")

  wrapper.vm.weekDays(date)
  t.true(methodStub.calledOnce)
  t.deepEqual(methodStub.args[0], [date])

  methodStub.restore()
});

test('it should return days of week', t => {
  const wrapper = shallowMount(bar, { localVue })
  const methodStub = sinon.stub(wrapper.vm, "weekDays").returns([1,2,3])

  t.deepEqual(wrapper.vm.weekDays(date), [1,2,3])

  methodStub.restore()
});
