import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import test from 'ava';
import bar from '@/components/days/bar'

const localVue = createLocalVue()
localVue.use(Vuetify)

const date = new Date('Sun Oct 27 2019 00:00:00 GMT+0000');

test('it should set the new current date', t => {
  const wrapper = shallowMount(bar, { localVue })
  wrapper.vm.currentDate = date
  wrapper.vm.changeWeek(-7)
  t.deepEqual(wrapper.vm.currentDate, new Date('Sun Oct 20 2019 00:00:00 GMT+0000'))
});

test('it should call method for selecting the right tab', t => {
  const wrapper = shallowMount(bar, { localVue })
  const methodStub = sinon.stub(wrapper.vm, "setTheRightTab")

  wrapper.vm.changeWeek(-7)
  t.true(methodStub.calledOnce)

  methodStub.restore()
});
