import createWrapper from '@/test/support/create_wrapper.js'
import daysBar from '@/components/tasks/days_bar'
import { DateTime } from 'luxon'

describe('currentWeek', () => {
  const date = DateTime.local(2019, 10, 27);
  const propsData = {
    selectedDate: date,
    currentDate: date
  }

  it('should return formatted range of week', () => {
    const wrapper = createWrapper(daysBar, { propsData }, fakeStoreData())
    const i18nStub = sinon.stub(wrapper.vm, "$d")
    i18nStub.onCall(0).returns("October 21");
    i18nStub.onCall(1).returns("October 27");

    wrapper.vm.selectedDate = date
    expect(wrapper.vm.currentWeek).eq('October 21 - October 27');
    sinon.restore()
  });

});
