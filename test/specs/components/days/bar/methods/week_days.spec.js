import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import test from 'ava';
import bar from '@/components/days/bar'

const localVue = createLocalVue()
localVue.use(Vuetify)

const date = new Date('Sun Oct 27 2019 00:00:00 GMT+0000');

test('it should return 7 days of week', t => {
  const wrapper = shallowMount(bar, { localVue })
  const clock = sinon.useFakeTimers(date);

  const days = wrapper.vm.weekDays(date)
  t.deepEqual(days, [
    new Date('Sun Oct 21 2019 00:00:00 GMT+0000'),
    new Date('Sun Oct 22 2019 00:00:00 GMT+0000'),
    new Date('Sun Oct 23 2019 00:00:00 GMT+0000'),
    new Date('Sun Oct 24 2019 00:00:00 GMT+0000'),
    new Date('Sun Oct 25 2019 00:00:00 GMT+0000'),
    new Date('Sun Oct 26 2019 00:00:00 GMT+0000'),
    new Date('Sun Oct 27 2019 00:00:00 GMT+0000')
  ])

  clock.restore()
});
