import createWrapper from '@/test/support/create_wrapper.js'
import daysBar from '@/components/tasks/days_bar'
import { DateTime } from 'luxon'

describe('days', () => {
  const date = DateTime.local(2019, 10, 27);

  const methods = {
    weekDays: (value) => { return [date] },
    getFormattedDateForWeek: (value) => { return "" }
  }

  const propsData = {
    selectedDate: date,
    currentDate: date,
  }

  it('should call method for selecting days of week', () => {
    const methodStub = sinon.stub(methods, "weekDays").returns([date])
    const wrapper = createWrapper(daysBar, { methods, propsData }, fakeStoreData())

    expect(methodStub.calledOnce).be.true
    sinon.restore()
  });

  it('should return days of week', () => {
    const wrapper = createWrapper(daysBar, { methods, propsData }, fakeStoreData())
    expect(wrapper.vm.days).to.eql([date])
  });
});
