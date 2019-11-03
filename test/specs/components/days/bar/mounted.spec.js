import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import test from 'ava';
import bar from '@/components/days/bar'

const localVue = createLocalVue()
localVue.use(Vuetify)

const methods = {
  weekDays: () => { return [] },
  setTheRightTab: () => {}
}

const date = new Date('Sun Oct 27 2019 00:00:00 GMT+0000');

test('it should call method for selecting right tab', t => {
  const tabChooserStub = sinon.stub(methods, "setTheRightTab")
  const wrapper = shallowMount(bar, { localVue, methods })

  t.true(tabChooserStub.calledOnce)

  tabChooserStub.restore()
});
