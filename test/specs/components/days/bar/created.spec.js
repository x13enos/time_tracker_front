import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import test from 'ava';
import bar from '@/components/days/bar'

const localVue = createLocalVue()
localVue.use(Vuetify)


test('it should set interval id to component data', t => {
  const timeStub = sinon.useFakeTimers()
  const intervalStub = sinon.stub(timeStub, 'setInterval').returns(77)
  const wrapper = shallowMount(bar, { localVue })
  t.is(wrapper.vm.intervalId, 77)

  intervalStub.restore()
  timeStub.restore()
});
