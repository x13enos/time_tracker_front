import createWrapper from '@/test/support/create_wrapper.js'
import bar from '@/components/days/bar'
import { DateTime } from 'luxon'

describe('getFormattedWeekDateForTab', () => {
  const date = DateTime.local(2019, 10, 27);

  it('should return a date in the right format', () => {
    const wrapper = createWrapper(bar, {}, fakeStoreData())
    sinon.stub(wrapper.vm, "$d").withArgs(date, 'onlyWeekday').returns("Friday")

    expect(wrapper.vm.getFormattedWeekDateForTab(date)).to.eq("Friday")
    sinon.restore()
  });
});
