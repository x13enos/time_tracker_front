import createWrapper from '@/test/support/create_wrapper.js'
import bar from '@/components/days/bar'
import { DateTime } from 'luxon'

it('should set 6 as the value for tab', () => {
  const wrapper = createWrapper(bar, {}, fakeStoreData())
  wrapper.vm.selectedDate = DateTime.local(2019, 11, 3)

  wrapper.vm.setTheRightTab()
  expect(wrapper.vm.tab).to.eq(6)
});

it('should set 4 as the value for tab', () => {
  const wrapper = createWrapper(bar, {}, fakeStoreData())
  wrapper.vm.selectedDate = DateTime.local(2019, 11, 1)

  wrapper.vm.setTheRightTab()
  expect(wrapper.vm.tab).to.eq(4)
});
