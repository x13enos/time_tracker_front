import createWrapper from '@/test/support/create_wrapper.js'
import bar from '@/components/days/bar'
import { DateTime } from 'luxon'

const date = DateTime.local(2019, 10, 27);

it('should return a date in the right format', () => {
  const wrapper = createWrapper(bar, {}, fakeStoreData())
  sinon.stub(wrapper.vm, "$d").returns("Oct 27")

  expect(wrapper.vm.getFormattedDateForTab(date)).to.eq("Oct 27")
  sinon.restore()
});
